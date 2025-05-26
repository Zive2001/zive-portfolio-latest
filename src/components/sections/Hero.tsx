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

  // Light beam animation for each letter - matching layout theme
  const letterAnimation = {
    initial: { 
      background: 'linear-gradient(135deg, #312e81 0%, #3b82f6 25%, #8b5cf6 50%, #a855f7 75%, #c084fc 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      filter: 'brightness(0.8)',
      textShadow: 'none'
    },
    animate: (i) => ({
      filter: ['brightness(0.8)', 'brightness(1.6)', 'brightness(0.8)'],
      textShadow: [
        'none',
        '0 0 25px rgba(139, 92, 246, 0.9), 0 0 50px rgba(59, 130, 246, 0.5), 0 0 75px rgba(168, 85, 247, 0.3)',
        'none'
      ],
      transition: {
        delay: i * 0.08,
        duration: 0.7,
        repeat: Infinity,
        repeatDelay: 8,
        ease: 'easeInOut',
      },
    }),
  };

  const dotsAnimation = {
    initial: { 
      opacity: 0, 
      y: 0,
      background: 'linear-gradient(135deg, #312e81 0%, #8b5cf6 50%, #a855f7 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent'
    },
    animate: {
      opacity: 1,
      y: [0, -8, 0],
      filter: ['brightness(0.8)', 'brightness(1.4)', 'brightness(0.8)'],
      transition: {
        delay: 2.5,
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 6,
        ease: 'easeInOut',
      },
    },
  };

  // Custom styles for buttons matching layout theme
  const primaryButtonStyle = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
    border: 'none',
  };

  const secondaryButtonStyle = {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
    color: '#a855f7',
    borderColor: '#8b5cf6',
    borderWidth: '2px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  };

  // Hover event handlers matching layout theme
  const handlePrimaryMouseEnter = (e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)';
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.6)';
  };

  const handlePrimaryMouseLeave = (e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
    e.currentTarget.style.transform = 'translateY(0px)';
    e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.4)';
  };

  const handleSecondaryMouseEnter = (e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)';
    e.currentTarget.style.color = 'white';
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.boxShadow = '0 8px 30px rgba(168, 85, 247, 0.4)';
  };

  const handleSecondaryMouseLeave = (e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)';
    e.currentTarget.style.color = '#a855f7';
    e.currentTarget.style.transform = 'translateY(0px)';
    e.currentTarget.style.boxShadow = 'none';
  };

  const nameText = "Hi, I'm Supun Seneviratne";
  
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
        
        <motion.h1 
          ref={titleRef}
          className="text-4xl md:text-7xl lg:text-5xl font-bold mb-6 flex flex-wrap items-center justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            background: 'linear-gradient(135deg, #312e81 0%, #3b82f6 25%, #8b5cf6 50%, #a855f7 75%, #c084fc 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          }}
        >
          {nameText.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              initial="initial"
              animate="animate"
              variants={letterAnimation}
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #312e81 0%, #3b82f6 25%, #8b5cf6 50%, #a855f7 75%, #c084fc 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {char === " " ? "\u00A0" : char} 
            </motion.span>
          ))}
          <motion.span
            className="ml-2 flex"
            initial="initial"
            animate="animate"
            variants={dotsAnimation}
          >
            <span 
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #312e81 0%, #8b5cf6 50%, #a855f7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >.</span>
            <span 
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #312e81 0%, #8b5cf6 50%, #a855f7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >.</span>
            <span 
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #312e81 0%, #8b5cf6 50%, #a855f7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >.</span>
          </motion.span>
        </motion.h1>
        
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