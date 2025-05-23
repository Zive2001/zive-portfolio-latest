"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';


export const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8 }
    )
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    .fromTo(
      descriptionRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(
      '.hero-button',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
      '-=0.2'
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  // Custom styles for buttons
  const primaryButtonStyle = {
    backgroundColor: '#10A4EA',
    transition: 'background-color 0.3s ease',
  };

  const secondaryButtonStyle = {
    backgroundColor: '#F46F16',
    color: '#1a202c',
    borderColor: '#F46F16',
    transition: 'background-color 0.3s ease',
  };

  // Hover event handlers
  const handlePrimaryMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = '#EEBE49';
    e.currentTarget.style.color = '#1a202c';
  };

  const handlePrimaryMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = '#10A4EA';
    e.currentTarget.style.color = 'white';
  };

  const handleSecondaryMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = '#10A4EA';
    e.currentTarget.style.color = 'white';
  };

  const handleSecondaryMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = '#EEBE49';
    e.currentTarget.style.color = '#1a202c';
  };
  
  return (
    <section ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Particles background */}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-background" />
      
      {/* Left Image */}
      <div 
        ref={imageRef} 
        className="absolute left-4 md:left-12 lg:left-24 top-4/10 transform -translate-y-1/2 z-10 hidden md:block"
      >
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-28 h-28 bg-blue-500/10 rounded-lg transform rotate-6"></div>
                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-purple-500/10 rounded-lg transform -rotate-6"></div>
        <img 
          src="/images/ch1.svg" 
          alt="Developer Profile" 
          className="w-68 lg:w-84 xl:w-80 object-contain"
        />
      </div>
      
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
          className="text-4xl md:text-7xl lg:text-5xl font-bold mb-6"
        >
          Hi, I'm <span className="gradient-text">Supun Seneviratne</span>
        </h1>
        
        <p 
          ref={descriptionRef}
          className="text-xl md:text-1xl text-gray-300 mb-10 font-medium"
        >
          I create immersive digital experiences with cutting-edge technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button 
            variant="primary" 
            size="lg" 
            className="hero-button"
            style={primaryButtonStyle}
            onMouseEnter={handlePrimaryMouseEnter}
            onMouseLeave={handlePrimaryMouseLeave}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="hero-button"
            style={secondaryButtonStyle}
            onMouseEnter={handleSecondaryMouseEnter}
            onMouseLeave={handleSecondaryMouseLeave}
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