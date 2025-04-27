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
          
         {/* Timeline section with modernized animations and lean design */}
<div 
  ref={timelineRef}
  className="mt-16 pt-10 pb-16 border-t border-blue-500/20"
>
  <ScrollAnimation animation="fade-up">
    <h3 className="text-2xl font-semibold mb-10 text-center">
      <span className="relative inline-block">
        My Journey
        <motion.span 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-400 to-indigo-600"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </span>
    </h3>
    
    <div className="relative max-w-4xl mx-auto min-h-[500px]">
      {/* Timeline central line with improved gradient animation */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-900/30 transform -translate-x-1/2">
        {/* Animated progress overlay with modernized gradient */}
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-300 via-blue-500 to-indigo-600"
          style={{ 
            height: useTransform(
              timelineProgress,
              [0, 1],
              ["0%", "100%"]
            )
          }}
        />
      </div>
      
      {/* Timeline items with enhanced animations */}
      <div className="space-y-24">
        {timelineItems.map((item, index) => (
          <motion.div 
            key={index}
            className={`relative ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.9, 
                delay: index * 0.1,
                ease: [0.2, 0.65, 0.3, 0.9]
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
              {/* Enhanced timeline node with modern pulse effect */}
              <motion.div 
                className="absolute left-1/2 top-0 w-6 h-6 rounded-full transform -translate-x-1/2 z-10 flex items-center justify-center"
                style={{
                  background: "rgba(37, 99, 235, 0.15)",
                  backdropFilter: "blur(4px)",
                  border: `2px solid rgba(59, 130, 246, 0.6)`
                }}
                whileInView={{
                  scale: [1, 1.3, 1],
                  transition: {
                    scale: {
                      repeat: 3,
                      duration: 1.5,
                      ease: "easeInOut"
                    }
                  }
                }}
                viewport={{ once: false, margin: "-100px" }}
              >
                {/* Pulsing inner dot indicator */}
                <motion.div 
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #93c5fd, #3b82f6)" 
                  }}
                  whileInView={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.8, 1],
                    transition: {
                      repeat: 3,
                      duration: 1.2,
                      ease: "easeInOut"
                    }
                  }}
                  viewport={{ once: false, margin: "-100px" }}
                />
              </motion.div>
              
              {/* Year tag with cleaner design */}
              <div className={`mb-8 md:mb-0 md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                <motion.span 
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(30, 64, 175, 0.15)",
                    color: '#93c5fd',
                    border: `1px solid rgba(59, 130, 246, 0.3)`,
                    backdropFilter: "blur(4px)"
                  }}
                  whileHover={{
                    scale: 1.05,
                    background: "rgba(30, 64, 175, 0.25)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {item.year}
                </motion.span>
              </div>
              
              {/* Content card with modernized design and consistent left-aligned titles */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                <motion.div 
                  className="rounded-lg p-6 transition-all duration-300 border border-blue-500/20"
                  style={{
                    background: "rgba(30, 58, 138, 0.12)",
                    borderLeft: "3px solid rgba(59, 130, 246, 0.5)",
                    backdropFilter: "blur(4px)"
                  }}
                  whileHover={{
                    scale: 1.02,
                    background: "rgba(30, 58, 138, 0.18)",
                    boxShadow: "0 8px 30px -6px rgba(30, 64, 175, 0.2)",
                    transition: { duration: 0.3 }
                  }}
                  whileInView={{
                    x: index % 2 === 0 ? [10, 0] : [-10, 0],
                    transition: { duration: 0.5, ease: "easeOut" }
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex flex-col h-full">
                    {/* Upper portion with left-aligned title and subtitle */}
                    <div className="mb-4 text-left">
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <div className="flex items-center">
                        <div 
                          className="w-2 h-2 rounded-full mr-2"
                          style={{
                            background: "linear-gradient(135deg, #f9a8d4, #d8b4fe)"
                          }}
                        />
                        <p className="font-medium text-sm text-blue-300">
                          {item.company}
                        </p>
                      </div>
                    </div>
                    
                    {/* Separator line - horizontal gradient */}
                    <motion.div 
                      className="w-12 h-px mb-5"
                      style={{
                        background: "linear-gradient(90deg, rgba(59, 130, 246, 0.8), rgba(30, 58, 138, 0.3))"
                      }}
                      whileInView={{
                        width: ["0%", "48px"],
                        transition: { duration: 0.7, ease: "easeOut", delay: 0.2 }
                      }}
                      viewport={{ once: true }}
                    />
                    
                    {/* Description with subtle fade-in animation */}
                    <motion.p 
                      className="text-gray-400 text-sm font-light"
                      initial={{ opacity: 0 }}
                      whileInView={{ 
                        opacity: 1,
                        transition: { duration: 0.8, delay: 0.3 }
                      }}
                      viewport={{ once: true }}
                    >
                      {item.description}
                    </motion.p>
                    
                    {/* Skills tags with hover animations */}
                    <motion.div 
                      className="mt-5 flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.5, delay: 0.4 }
                      }}
                      viewport={{ once: true }}
                    >
                      {/* Sample skills tags with hover effect */}
                      {index === 0 && (
                        <>
                          <motion.span 
                            className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                            whileHover={{ 
                              scale: 1.08, 
                              background: "rgba(59, 130, 246, 0.2)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            React
                          </motion.span>
                          <motion.span 
                            className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                            whileHover={{ 
                              scale: 1.08, 
                              background: "rgba(59, 130, 246, 0.2)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            TypeScript
                          </motion.span>
                          <motion.span 
                            className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                            whileHover={{ 
                              scale: 1.08, 
                              background: "rgba(59, 130, 246, 0.2)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            CSS Modules
                          </motion.span>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <motion.span 
                            className="px-3 py-1 text-xs rounded-full bg-blue-600/10 text-blue-300 border border-blue-600/20"
                            whileHover={{ 
                              scale: 1.08, 
                              background: "rgba(37, 99, 235, 0.2)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            UI/UX
                          </motion.span>
                          <motion.span 
                            className="px-3 py-1 text-xs rounded-full bg-blue-600/10 text-blue-300 border border-blue-600/20"
                            whileHover={{ 
                              scale: 1.08, 
                              background: "rgba(37, 99, 235, 0.2)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            Figma
                          </motion.span>
                          <motion.span 
                            className="px-3 py-1 text-xs rounded-full bg-blue-600/10 text-blue-300 border border-blue-600/20"
                            whileHover={{ 
                              scale: 1.08, 
                              background: "rgba(37, 99, 235, 0.2)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            Animation
                          </motion.span>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <motion.span 
                            className="px-3 py-1 text-xs rounded-full bg-blue-700/10 text-blue-300 border border-blue-700/20"
                            whileHover={{ 
                              scale: 1.08, 
                              background: "rgba(29, 78, 216, 0.2)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            JavaScript
                          </motion.span>
                          <motion.span 
                            className="px-3 py-1 text-xs rounded-full bg-blue-700/10 text-blue-300 border border-blue-700/20"
                            whileHover={{ 
                              scale: 1.08, 
                              background: "rgba(29, 78, 216, 0.2)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            GSAP
                          </motion.span>
                          <motion.span 
                            className="px-3 py-1 text-xs rounded-full bg-blue-700/10 text-blue-300 border border-blue-700/20"
                            whileHover={{ 
                              scale: 1.08, 
                              background: "rgba(29, 78, 216, 0.2)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            CSS
                          </motion.span>
                        </>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {  /* Modernized scroll indicator with cleaner animation */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 pointer-events-none"
        animate={{ 
          opacity: activeIndex === timelineItems.length - 1 ? 0 : [0.7, 0.9, 0.7],
          y: activeIndex === timelineItems.length - 1 ? 20 : [0, 6, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2.5,
          ease: "easeInOut"
        }}
        style={{
          display: activeIndex === timelineItems.length - 1 ? 'none' : 'flex'
        }}
      >
        <p className="text-xs text-blue-300 mb-2 font-light tracking-wider">Scroll to explore</p>
        <motion.div
          className="w-5 h-10 rounded-full border border-blue-400/60 flex items-center justify-center overflow-hidden"
          animate={{ boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 8px rgba(59, 130, 246, 0.3)", "0 0 0px rgba(59, 130, 246, 0)"] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
            animate={{ y: [0, 13, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              ease: [0.65, 0, 0.35, 1]
            }}
          />
        </motion.div>
      </motion.div>
      
      {  /* Bottom progress indicator with moderate spacing */}
      <div className="absolute -bottom-16 left-0 right-0 h-1 bg-blue-900/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600"
          style={{ 
            width: useTransform(
              timelineProgress, 
              [0, 1], 
              ["0%", "100%"]
            ),
            borderRadius: "4px"
          }}
        />
      </div>
    </div>
  </ScrollAnimation>
</div>
        </div>
      </section>
    );
  };