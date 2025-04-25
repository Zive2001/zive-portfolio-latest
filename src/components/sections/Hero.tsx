"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';


export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 }, // Reduced y value
      { opacity: 1, y: 0, duration: 0.8 } // Reduced duration
    )
    .fromTo(
      descriptionRef.current,
      { opacity: 0, y: 15 }, // Reduced y value
      { opacity: 1, y: 0, duration: 0.6 }, // Reduced duration
      '-=0.3'
    )
    .fromTo(
      '.hero-button',
      { opacity: 0, y: 10 }, // Reduced y value
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, // Reduced duration
      '-=0.2'
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  return (
    <section ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Particles background */}
      
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-background" />
      
      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center justify-center text-center max-w-3xl">
        <motion.div
          className="flex items-center justify-center gap-1 mb-4 p-2 border border-blue-500/30 bg-blue-500/10 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium text-blue-200">Creative Developer</span>
        </motion.div>
        
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          Hi, I'm <span className="gradient-text">Your Name</span>
        </h1>
        
        <p 
          ref={descriptionRef}
          className="text-xl md:text-2xl text-gray-300 mb-10"
        >
          I create immersive digital experiences with cutting-edge technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button 
            variant="primary" 
            size="lg" 
            className="hero-button"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="hero-button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={32} className="text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
};