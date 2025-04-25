"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollAnimation } from '../animations/ScrollAnimations';
import { Button } from '../ui/Button';
import { FileText, Github, Linkedin, Twitter } from 'lucide-react';

export const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
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
      className="relative py-24 md:py-32 bg-gradient-to-b from-background to-blue-950/20 overflow-hidden"
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
          
          {/* Right column: Content */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <ScrollAnimation animation="fade-up">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <p className="text-lg text-gray-300 mb-6">
                  I'm a creative developer and designer with a passion for building immersive digital experiences. With a background in both design and development, I bring a unique perspective to every project.
                </p>
                
                <p className="text-lg text-gray-300 mb-8">
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
        
        {/* Timeline section - now full width below the about content */}
        <div className="mt-16 pt-8 border-t border-blue-500/20">
          <ScrollAnimation animation="fade-up">
            <h3 className="text-2xl font-semibold mb-8 text-center">My Journey</h3>
            
            <div className="relative max-w-3xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500/30 transform -translate-x-1/2" />
              
              {/* Timeline items */}
              <div className="space-y-12">
                {timelineItems.map((item, index) => (
                  <ScrollAnimation
                    key={index}
                    animation={index % 2 === 0 ? "fade-right" : "fade-left"}
                    delay={index * 0.1}
                    className="relative"
                  >
                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 top-0 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2 z-10" />
                      
                      {/* Year tag - positioned differently based on even/odd */}
                      <div className={`mb-4 md:mb-0 md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300">
                          {item.year}
                        </span>
                      </div>
                      
                      {/* Content - positioned differently based on even/odd */}
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-6 hover:bg-blue-800/20 transition-colors duration-300">
                          <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                          <p className="text-blue-300 mb-3">{item.company}</p>
                          <p className="text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};