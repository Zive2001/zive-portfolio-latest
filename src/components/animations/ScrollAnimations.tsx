"use client";

import React, { useEffect } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type ScrollAnimationProps = {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'flip' | 'rotate';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
};

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: threshold });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    if (!ref.current) return;
    
    // Set initial styles based on animation type
    const element = ref.current;
    let initialStyles: gsap.TweenVars = {};
    let animationStyles: gsap.TweenVars = {};
    
    switch (animation) {
      case 'fade-up':
        initialStyles = { y: 50, opacity: 0 };
        animationStyles = { y: 0, opacity: 1 };
        break;
      case 'fade-down':
        initialStyles = { y: -50, opacity: 0 };
        animationStyles = { y: 0, opacity: 1 };
        break;
      case 'fade-left':
        initialStyles = { x: 50, opacity: 0 };
        animationStyles = { x: 0, opacity: 1 };
        break;
      case 'fade-right':
        initialStyles = { x: -50, opacity: 0 };
        animationStyles = { x: 0, opacity: 1 };
        break;
      case 'zoom-in':
        initialStyles = { scale: 0.8, opacity: 0 };
        animationStyles = { scale: 1, opacity: 1 };
        break;
      case 'flip':
        initialStyles = { rotationX: 90, opacity: 0 };
        animationStyles = { rotationX: 0, opacity: 1 };
        break;
      case 'rotate':
        initialStyles = { rotation: -15, opacity: 0 };
        animationStyles = { rotation: 0, opacity: 1 };
        break;
      default:
        initialStyles = { opacity: 0 };
        animationStyles = { opacity: 1 };
    }
    
    // Apply initial styles
    gsap.set(element, initialStyles);
    
    // Create ScrollTrigger animation
    const animationConfig = {
      ...animationStyles,
      duration,
      delay,
      ease: 'power3.out',
    };
    
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => gsap.to(element, animationConfig),
      onLeaveBack: !triggerOnce ? () => gsap.to(element, initialStyles) : undefined,
      onEnterBack: !triggerOnce ? () => gsap.to(element, animationConfig) : undefined,
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, delay, duration, triggerOnce, threshold]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export { ScrollAnimation };