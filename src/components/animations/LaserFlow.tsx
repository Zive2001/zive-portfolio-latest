"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERT = `
void main(){
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG = `
precision highp float;
precision mediump int;

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform float uWispDensity;
uniform float uTiltScale;
uniform float uFlowTime;
uniform float uFogTime;
uniform float uBeamXFrac;
uniform float uBeamYFrac;
uniform float uFlowSpeed;
uniform float uVLenFactor;
uniform float uHLenFactor;
uniform float uFogIntensity;
uniform float uFogScale;
uniform float uWSpeed;
uniform float uWIntensity;
uniform float uFlowStrength;
uniform float uDecay;
uniform float uFalloffStart;
uniform float uFogFallSpeed;
uniform vec3 uColor;
uniform float uFade;

#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define EPS 1e-6
#define EDGE_SOFT 0.015
#define R_H 150.0
#define R_V 150.0
#define FLARE_HEIGHT 16.0
#define FLARE_AMOUNT 8.0
#define FLARE_EXP 2.0
#define TOP_FADE_START 0.1
#define TOP_FADE_EXP 1.0
#define FLOW_PERIOD 0.5
#define FLOW_SHARPNESS 1.5

#define W_BASE_X 1.5
#define W_LAYER_GAP 0.25
#define W_LANES 10
#define W_SIDE_DECAY 0.5
#define W_HALF 0.01
#define W_AA 0.15
#define W_CELL 20.0
#define W_SEG_MIN 0.01
#define W_SEG_MAX 0.55
#define W_CURVE_AMOUNT 15.0
#define W_CURVE_RANGE (FLARE_HEIGHT - 3.0)
#define W_BOTTOM_EXP 10.0

#define FOG_ON 1
#define FOG_CONTRAST 1.2
#define FOG_SPEED_U 0.1
#define FOG_SPEED_V -0.1
#define FOG_OCTAVES 5

#define HFOG_EDGE_START 0.20
#define HFOG_EDGE_END 0.98
#define HFOG_EDGE_GAMMA 1.4
#define HFOG_Y_RADIUS 25.0
#define HFOG_Y_SOFT 60.0

#define EDGE_X0 0.22
#define EDGE_X1 0.995
#define EDGE_X_GAMMA 1.25

float bsa(vec2 p, vec2 q, float powr, vec2 s) {
    vec2 d = p - q;
    float dd = (d.x * d.x) / (s.x * s.x) + (d.y * d.y) / (s.y * s.y);
    float f = powr * uFalloffStart;
    float r = (f * f) / (dd + EPS);
    return powr * min(1.0, r);
}

float h21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.123);
    return fract(p.x * p.y);
}

float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = h21(i);
    float b = h21(i + vec2(1, 0));
    float c = h21(i + vec2(0, 1));
    float d = h21(i + vec2(1, 1));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm2(vec2 p) {
    float v = 0.0;
    float amp = 0.6;
    mat2 m = mat2(0.86, 0.5, -0.5, 0.86);
    for(int i = 0; i < FOG_OCTAVES; ++i) {
        v += amp * vnoise(p);
        p = m * p * 2.03 + 17.1;
        amp *= 0.52;
    }
    return v;
}

float rGate(float x, float l) {
    float a = smoothstep(0.0, W_AA, x);
    float b = 1.0 - smoothstep(l, l + W_AA, x);
    return max(0.0, a * b);
}

float flareY(float y) {
    float t = clamp(1.0 - (clamp(y, 0.0, FLARE_HEIGHT) / max(FLARE_HEIGHT, EPS)), 0.0, 1.0);
    return pow(t, FLARE_EXP);
}

float vWisps(vec2 uv, float topF) {
    float y = uv.y;
    float yf = (y + uFlowTime * uWSpeed) / W_CELL;
    float dRaw = clamp(uWispDensity, 0.0, 2.0);
    float d = dRaw <= 0.0 ? 1.0 : dRaw;
    float lanesF = floor(float(W_LANES) * min(d, 1.0) + 0.5);
    int lanes = int(max(1.0, lanesF));

    float fm = flareY(max(y, 0.0));
    float rm = clamp(1.0 - (y / max(W_CURVE_RANGE, EPS)), 0.0, 1.0);
    float cm = fm * rm;
    const float G = 0.05;
    float xS = 1.0 + (FLARE_AMOUNT * W_CURVE_AMOUNT * G) * cm;
    float sPix = clamp(y / R_V, 0.0, 1.0);
    float bGain = pow(1.0 - sPix, W_BOTTOM_EXP);
    float sum = 0.0;

    for(int s = 0; s < 2; ++s) {
        float sgn = s == 0 ? -1.0 : 1.0;
        for(int i = 0; i < W_LANES; ++i) {
            if(i >= lanes) break;
            float off = W_BASE_X + float(i) * W_LAYER_GAP;
            float xc = sgn * (off * xS);
            float dx = abs(uv.x - xc);
            float lat = 1.0 - smoothstep(W_HALF, W_HALF + W_AA, dx);
            float amp = exp(-off * W_SIDE_DECAY);
            float seed = h21(vec2(off, sgn * 17.0));
            float yf2 = yf + seed * 7.0;
            float ci = floor(yf2);
            float cf = fract(yf2);
            float segL = mix(W_SEG_MIN, W_SEG_MAX, h21(vec2(ci, off * sgn)));
            float gate = rGate(cf, segL) * lat * amp * bGain * uWIntensity * topF;
            sum += gate;
        }
    }
    return sum;
}

vec3 computeBeam(vec2 uv) {
    float y = uv.y;
    float ys = max(y, 0.0);
    vec2 ctr = vec2(0.0, R_V);
    float hL = uHLenFactor * R_H;
    float vL = uVLenFactor * R_V;
    vec2 bS = vec2(hL, vL);
    float rad = bsa(uv, ctr, 1.0, bS);
    float topFade = 1.0 - smoothstep(TOP_FADE_START * R_V, R_V, ys);
    topFade = pow(max(topFade, 0.0), TOP_FADE_EXP);

    float flowPhase = (uFlowTime / FLOW_PERIOD) * TWO_PI;
    float flowMask = sin(flowPhase * 0.5) * 0.5 + 0.5;
    flowMask = pow(flowMask, FLOW_SHARPNESS);
    float flowEffect = 1.0 + uFlowStrength * flowMask;

    rad *= flowEffect;

    float wispContrib = vWisps(uv, topFade);
    float beam = exp(-rad * uDecay) * topFade;
    beam += wispContrib;

    return vec3(beam);
}

vec3 computeFog(vec2 uv) {
    vec2 fogUV = uv * uFogScale + vec2(uFogTime * FOG_SPEED_U, uFogTime * FOG_SPEED_V);
    float fog = fbm2(fogUV);
    fog = pow(fog, FOG_CONTRAST);

    float y = uv.y;
    float yMask = exp(-abs(y) / HFOG_Y_RADIUS) * HFOG_Y_SOFT;

    float x = abs(uv.x);
    float xMask = 1.0 - smoothstep(HFOG_EDGE_START * R_H, HFOG_EDGE_END * R_H, x);
    xMask = pow(xMask, HFOG_EDGE_GAMMA);

    fog *= yMask * xMask * uFogIntensity;
    return vec3(fog);
}

void main() {
    vec2 res = iResolution.xy;
    vec2 uv = (gl_FragCoord.xy - 0.5 * res) / min(res.x, res.y);

    uv.x += uBeamXFrac * R_H;
    uv.y += uBeamYFrac * R_V;

    vec3 beam = computeBeam(uv);
    vec3 fog = computeFog(uv);

    vec3 result = (beam + fog) * uColor;
    result *= uFade;

    float edgeX = abs(uv.x) / R_H;
    float edgeMask = 1.0 - smoothstep(EDGE_X0, EDGE_X1, edgeX);
    edgeMask = pow(edgeMask, EDGE_X_GAMMA);

    result *= edgeMask;

    gl_FragColor = vec4(result, 1.0);
}
`;

interface LaserFlowProps {
  wispDensity?: number;
  mouseTiltStrength?: number;
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  flowSpeed?: number;
  verticalSizing?: number;
  horizontalSizing?: number;
  fogIntensity?: number;
  fogScale?: number;
  wispSpeed?: number;
  wispIntensity?: number;
  flowStrength?: number;
  decay?: number;
  falloffStart?: number;
  fogFallSpeed?: number;
  color?: string;
  fade?: number;
}

const LaserFlow: React.FC<LaserFlowProps> = ({
  wispDensity = 1.0,
  mouseTiltStrength = 0.5,
  horizontalBeamOffset = 0.0,
  verticalBeamOffset = 0.0,
  flowSpeed = 1.0,
  verticalSizing = 1.0,
  horizontalSizing = 1.0,
  fogIntensity = 0.3,
  fogScale = 1.0,
  wispSpeed = 1.0,
  wispIntensity = 1.0,
  flowStrength = 0.5,
  decay = 1.0,
  falloffStart = 1.0,
  fogFallSpeed = 1.0,
  color = '#FF79C6',
  fade = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const uniformsRef = useRef<{ [key: string]: { value: any } } | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const hexToRGB = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 1, g: 1, b: 1 };
  };

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    container.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(width, height, 1) },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      uWispDensity: { value: wispDensity },
      uTiltScale: { value: mouseTiltStrength },
      uFlowTime: { value: 0 },
      uFogTime: { value: 0 },
      uBeamXFrac: { value: horizontalBeamOffset },
      uBeamYFrac: { value: verticalBeamOffset },
      uFlowSpeed: { value: flowSpeed },
      uVLenFactor: { value: verticalSizing },
      uHLenFactor: { value: horizontalSizing },
      uFogIntensity: { value: fogIntensity },
      uFogScale: { value: fogScale },
      uWSpeed: { value: wispSpeed },
      uWIntensity: { value: wispIntensity },
      uFlowStrength: { value: flowStrength },
      uDecay: { value: decay },
      uFalloffStart: { value: falloffStart },
      uFogFallSpeed: { value: fogFallSpeed },
      uColor: { value: new THREE.Vector3(1, 1, 1) },
      uFade: { value: fade },
    };

    const { r, g, b } = hexToRGB(color);
    uniforms.uColor.value.set(r, g, b);

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    materialRef.current = material;
    uniformsRef.current = uniforms;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
    };

    container.addEventListener('mousemove', handleMouseMove);

    const animate = (time: number) => {
      if (!uniformsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      const t = time * 0.001;
      uniformsRef.current.iTime.value = t;
      uniformsRef.current.uFlowTime.value = t * flowSpeed;
      uniformsRef.current.uFogTime.value = t * fogFallSpeed;

      const rect = container.getBoundingClientRect();
      uniformsRef.current.iMouse.value.set(
        mouseRef.current.x,
        rect.height - mouseRef.current.y,
        0,
        0
      );

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    const uniforms = uniformsRef.current;
    if (!uniforms) return;

    uniforms.uWispDensity.value = wispDensity;
    uniforms.uTiltScale.value = mouseTiltStrength;
    uniforms.uBeamXFrac.value = horizontalBeamOffset;
    uniforms.uBeamYFrac.value = verticalBeamOffset;
    uniforms.uFlowSpeed.value = flowSpeed;
    uniforms.uVLenFactor.value = verticalSizing;
    uniforms.uHLenFactor.value = horizontalSizing;
    uniforms.uFogIntensity.value = fogIntensity;
    uniforms.uFogScale.value = fogScale;
    uniforms.uWSpeed.value = wispSpeed;
    uniforms.uWIntensity.value = wispIntensity;
    uniforms.uFlowStrength.value = flowStrength;
    uniforms.uDecay.value = decay;
    uniforms.uFalloffStart.value = falloffStart;
    uniforms.uFogFallSpeed.value = fogFallSpeed;

    const { r, g, b } = hexToRGB(color || '#FFFFFF');
    uniforms.uColor.value.set(r, g, b);
  }, [
    wispDensity,
    mouseTiltStrength,
    horizontalBeamOffset,
    verticalBeamOffset,
    flowSpeed,
    verticalSizing,
    horizontalSizing,
    fogIntensity,
    fogScale,
    wispSpeed,
    wispIntensity,
    flowStrength,
    decay,
    falloffStart,
    fogFallSpeed,
    color,
    fade,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default LaserFlow;