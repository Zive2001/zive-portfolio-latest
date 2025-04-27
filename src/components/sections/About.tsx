"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ScrollAnimation } from '../animations/ScrollAnimations';
import { Button } from '../ui/Button';
import { FileText, Github, Linkedin, Twitter } from 'lucide-react';
// Import Poppins font
import { Poppins } from 'next/font/google';

// Initialize the font with different weights
const poppins = Poppins({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const About = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Create a separate scroll progress for the timeline section
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  // Track active timeline item
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Update active item based on scroll position
  useEffect(() => {
    const unsubscribe = timelineProgress.onChange(value => {
      // Map the 0-1 progress to our timeline items
      // For 3 items, we'd want to split into 3 sections: 0-0.33, 0.33-0.66, 0.66-1
      const itemCount = timelineItems.length;
      const itemThreshold = 1 / itemCount;
      
      // Calculate which item should be active based on current scroll progress
      const newActiveIndex = Math.min(
        Math.floor(value / itemThreshold),
        itemCount - 1
      );
      
      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    });
    
    return () => unsubscribe();
  }, [timelineProgress, activeIndex]);
  
  const timelineItems = [
    {
      year: '2022',
      title: 'Senior Frontend Developer',
      company: 'Tech Company',
      description: 'Led development of responsive web applications using React, TypeScript, and modern CSS.'
    },
    {
      year: '2020',
      title: 'UI/UX Designer & Developer',
      company: 'Design Studio',
      description: 'Created and implemented innovative user interfaces for web and mobile applications.'
    },
    {
      year: '2018',
      title: 'Frontend Developer',
      company: 'Startup',
      description: 'Built interactive web experiences with JavaScript and CSS animations.'
    }
  ];
  
  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className={`${poppins.className} relative py-24 md:py-32 bg-gradient-to-b from-background to-blue-950/20 overflow-hidden`}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-16">
          {/* Centered About Me header */}
          <ScrollAnimation animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">About Me</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          </ScrollAnimation>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left column: Image and social links */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <motion.div 
              style={{ y, opacity }} 
              className="relative z-10 max-w-sm mx-auto"
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-lg" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-lg" />
                
                {/* Profile image with border */}
                <div className="relative z-10 rounded-lg overflow-hidden border-2 border-blue-500/30 shadow-xl shadow-blue-500/10">
                  <div className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                    Your Image Here
                  </div>
                </div>
              </div>
              
              {/* Social links */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <motion.a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800/30 flex items-center justify-center text-blue-400 hover:bg-blue-700/50 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800/30 flex items-center justify-center text-blue-400 hover:bg-blue-700/50 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800/30 flex items-center justify-center text-blue-400 hover:bg-blue-700/50 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          {/* Right column: Content with Poppins font */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <ScrollAnimation animation="fade-up">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <p className="text-base md:text-[17px] text-gray-300 mb-6 font-medium leading-relaxed">
                  I'm a creative developer and designer with a passion for building immersive digital experiences. With a background in both design and development, I bring a unique perspective to every project.
                </p>
                
                <p className="text-base md:text-[17px] text-gray-300 mb-8 font-medium leading-relaxed">
                  My journey started with a fascination for how technology and design intersect to create meaningful experiences. Today, I focus on crafting intuitive, accessible, and visually stunning interfaces that push the boundaries of what's possible on the web.
                </p>
                
                <div className="flex justify-center lg:justify-start mb-16">
                  <Button 
                    variant="outline" 
                    size="md" 
                    icon={<FileText size={18} />}
                  >
                    Download Resume
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
        
        {/* Timeline section - now with dynamic scroll animation */}
        <div 
          ref={timelineRef}
          className="mt-16 pt-8 border-t border-blue-500/20"
        >
          <ScrollAnimation animation="fade-up">
            <h3 className="text-2xl font-semibold mb-12 text-center">My Journey</h3>
            
            <div className="relative max-w-3xl mx-auto min-h-[600px]">
              {/* Timeline line with progress animation */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500/10 transform -translate-x-1/2">
                {/* Animated progress overlay */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                  style={{ 
                    height: useTransform(
                      timelineProgress,
                      [0, 1],
                      ["0%", "100%"]
                    )
                  }}
                />
              </div>
              
              {/* Timeline items - now with animated nodes */}
              <div className="space-y-32">
                {timelineItems.map((item, index) => (
                  <div 
                    key={index}
                    className={`relative ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                      {/* Animated timeline node */}
                      <motion.div 
                        className={`absolute left-1/2 top-0 w-6 h-6 rounded-full border-2 border-blue-500 bg-blue-900 transform -translate-x-1/2 z-10 flex items-center justify-center transition-all duration-500 ease-out ${index <= activeIndex ? 'border-purple-400' : ''}`}
                        animate={{
                          scale: index === activeIndex ? 1.3 : 1,
                          backgroundColor: index <= activeIndex 
                            ? 'rgba(139, 92, 246, 0.5)' // purple-500 with opacity
                            : 'rgba(30, 64, 175, 0.3)', // blue-900 with opacity
                          borderColor: index <= activeIndex 
                            ? '#a78bfa' // purple-400
                            : '#3b82f6', // blue-500
                          boxShadow: index === activeIndex 
                            ? '0 0 15px 5px rgba(139, 92, 246, 0.3)' 
                            : 'none'
                        }}
                      >
                        {/* Inner dot indicator */}
                        <motion.div 
                          className="w-2 h-2 rounded-full"
                          animate={{
                            backgroundColor: index <= activeIndex 
                              ? '#d8b4fe' // purple-300
                              : '#93c5fd' // blue-300
                          }}
                        />
                      </motion.div>
                      
                      {/* Year tag - positioned differently based on even/odd */}
                      <div className={`mb-8 md:mb-0 md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                        <motion.span 
                          className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300"
                          animate={{
                            backgroundColor: index <= activeIndex 
                              ? 'rgba(139, 92, 246, 0.2)' // purple-500 with opacity
                              : 'rgba(59, 130, 246, 0.2)', // blue-500 with opacity
                            color: index <= activeIndex 
                              ? '#c4b5fd' // purple-300
                              : '#93c5fd' // blue-300
                          }}
                        >
                          {item.year}
                        </motion.span>
                      </div>
                      
                      {/* Content card - with animation based on active state */}
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                        <motion.div 
                          className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-6 transition-all duration-300"
                          initial={{ opacity: 0.7, y: 20 }}
                          animate={{
                            opacity: index === activeIndex ? 1 : 0.7,
                            y: index === activeIndex ? 0 : 20,
                            backgroundColor: index <= activeIndex 
                              ? 'rgba(91, 33, 182, 0.2)' // purple-800 with opacity
                              : 'rgba(30, 58, 138, 0.2)', // blue-900 with opacity
                            borderColor: index <= activeIndex 
                              ? 'rgba(139, 92, 246, 0.2)' // purple-500 with opacity
                              : 'rgba(59, 130, 246, 0.2)', // blue-500 with opacity
                            scale: index === activeIndex ? 1.05 : 1
                          }}
                          transition={{ 
                            duration: 0.5,
                            ease: [0.4, 0.0, 0.2, 1]
                          }}
                        >
                          <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                          <p className="mb-3 transition-colors duration-300 font-medium text-sm ${
                            index <= activeIndex ? 'text-purple-300' : 'text-blue-300'
                          }">{item.company}</p>
                          <p className="text-gray-400 text-sm font-light">{item.description}</p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Fancy scrolling indicator */}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-50 pointer-events-none"
                animate={{ 
                  opacity: activeIndex === timelineItems.length - 1 ? 0 : [0.5, 0.8, 0.5],
                  y: activeIndex === timelineItems.length - 1 ? 20 : [0, 10, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
                style={{
                  display: activeIndex === timelineItems.length - 1 ? 'none' : 'flex'
                }}
              >
                <p className="text-xs text-blue-300 mb-2">Scroll to continue the journey</p>
                <svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="18" height="28" rx="9" stroke="#3B82F6" strokeWidth="2"/>
                  <motion.circle 
                    cx="10" 
                    cy="10" 
                    r="4" 
                    fill="#3B82F6"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </motion.div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};