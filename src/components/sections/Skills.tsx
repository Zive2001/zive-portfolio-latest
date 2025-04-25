"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollAnimation } from '../animations/ScrollAnimations';
import gsap from 'gsap';
import Image from 'next/image';
import { 
  FaReact, 
  FaSass, 
  FaFigma, 
  FaPaintBrush, 
  FaNodeJs, 
  FaServer,
  FaGitAlt,
  FaCode
} from 'react-icons/fa';

import {
  SiTypescript,
  SiNextdotjs,
  SiFramer,
  SiTailwindcss,
  SiGreensock,
  SiGraphql,
  SiThreedotjs
} from 'react-icons/si';

import { BiMoviePlay } from 'react-icons/bi';

export const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Icon mapping for skills
  const getIcon = (name) => {
    const iconMap = {
      'React': <FaReact className="w-5 h-5 text-blue-400" />,
      'TypeScript': <SiTypescript className="w-5 h-5 text-blue-400" />,
      'Next.js': <SiNextdotjs className="w-5 h-5 text-blue-400" />,
      'CSS/SCSS': <FaSass className="w-5 h-5 text-blue-400" />,
      'Framer Motion': <SiFramer className="w-5 h-5 text-blue-400" />,
      'Figma': <FaFigma className="w-5 h-5 text-blue-400" />,
      'UI/UX': <FaPaintBrush className="w-5 h-5 text-blue-400" />,
      'Animation': <BiMoviePlay className="w-5 h-5 text-blue-400" />,
      'Responsive Design': <SiTailwindcss className="w-5 h-5 text-blue-400" />,
      'Node.js': <FaNodeJs className="w-5 h-5 text-blue-400" />,
      'GraphQL': <SiGraphql className="w-5 h-5 text-blue-400" />,
      'RESTful APIs': <FaServer className="w-5 h-5 text-blue-400" />
    };
    
    return iconMap[name] || <FaCode className="w-5 h-5 text-blue-400" />;
  };
  
  // Tech logos for the tools section with actual components
  const techLogos = [
    { name: 'React', icon: <FaReact className="w-6 h-6" /> },
    { name: 'TypeScript', icon: <SiTypescript className="w-6 h-6" /> },
    { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6" /> },
    { name: 'Tailwind', icon: <SiTailwindcss className="w-6 h-6" /> },
    { name: 'GSAP', icon: <SiGreensock className="w-6 h-6" /> },
    { name: 'Framer Motion', icon: <SiFramer className="w-6 h-6" /> },
    { name: 'Three.js', icon: <SiThreedotjs className="w-6 h-6" /> },
    { name: 'Figma', icon: <FaFigma className="w-6 h-6" /> },
    { name: 'Node.js', icon: <FaNodeJs className="w-6 h-6" /> },
    { name: 'Git', icon: <FaGitAlt className="w-6 h-6" /> }
  ];
  
  // Skill categories with items
  const skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Next.js', level: 80 },
        { name: 'CSS/SCSS', level: 90 },
        { name: 'Framer Motion', level: 85 },
      ]
    },
    {
      name: 'Design',
      skills: [
        { name: 'Figma', level: 90 },
        { name: 'UI/UX', level: 85 },
        { name: 'Animation', level: 75 },
        { name: 'Responsive Design', level: 90 },
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 75 },
        { name: 'GraphQL', level: 70 },
        { name: 'RESTful APIs', level: 80 },
      ]
    },
  ];
  
  // GSAP animation for skill bars
  useEffect(() => {
    if (!isInView) return;
    
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    gsap.fromTo(
      skillBars,
      { width: 0 },
      {
        width: index => `${skillCategories.flatMap(cat => cat.skills)[index].level}%`,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.1,
      }
    );
  }, [isInView, skillCategories]);

  // Create orbital animation for the floating icons
  useEffect(() => {
    if (!isInView) return;
    
    const orbitElements = document.querySelectorAll('.orbit-icon');
    
    orbitElements.forEach((element, index) => {
      const angle = index * (Math.PI * 2 / 5);
      
      gsap.to(element, {
        duration: 20,
        repeat: -1,
        ease: "linear",
        motionPath: {
          path: function() {
            return [
              {x: Math.cos(angle) * 120, y: Math.sin(angle) * 120},
              {x: Math.cos(angle + Math.PI/2.5) * 120, y: Math.sin(angle + Math.PI/2.5) * 120},
              {x: Math.cos(angle + Math.PI) * 120, y: Math.sin(angle + Math.PI) * 120},
              {x: Math.cos(angle + Math.PI*1.5) * 120, y: Math.sin(angle + Math.PI*1.5) * 120},
              {x: Math.cos(angle + Math.PI*2) * 120, y: Math.sin(angle + Math.PI*2) * 120}
            ];
          },
          curviness: 1.8
        }
      });
    });
    
    return () => {
      // Cleanup animation when component unmounts or is no longer in view
      orbitElements.forEach(element => {
        gsap.killTweensOf(element);
      });
    };
  }, [isInView]);
  
  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="relative py-24 md:py-32 bg-gradient-to-b from-background to-blue-950/10"
    >
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500/10 rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border border-purple-500/10 rounded-lg transform -rotate-12"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side - Robot Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ScrollAnimation animation="fade-up">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-28 h-28 bg-blue-500/10 rounded-lg transform rotate-6"></div>
                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-purple-500/10 rounded-lg transform -rotate-6"></div>
                
                {/* Main robot image container */}
                <div className="relative z-10 rounded-lg overflow-hidden border-2 border-none shadow-xl">
                  <div className="aspect-square sm:aspect-[4/3] bg-gradient-none p-6 flex items-center justify-center">
                    <div className="relative w-full h-full max-w-xs mx-auto flex items-center justify-center">
                      {/* Robot image with floating animation */}
                      <motion.div
                        animate={{
                          y: [0, -15, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                        className="w-full h-full relative"
                      >
                        <Image
                          src="/images/ch2.svg"
                          alt="Robot Character"
                          width={300}
                          height={300}
                          className="drop-shadow-xl object-contain"
                        />
                      </motion.div>
                      
                      {/* Floating tech icons around the robot */}
                      {techLogos.slice(0, 5).map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          className="absolute rounded-full bg-gradient-to-br from-blue-800/90 to-purple-800/90 backdrop-blur-sm border border-blue-400/30 p-2 flex items-center justify-center shadow-lg orbit-icon group"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ 
                            opacity: 1,
                            scale: 1,
                            // Initial positions are set here but will be overridden by GSAP
                            x: Math.cos(index * (Math.PI * 2 / 5)) * 120,
                            y: Math.sin(index * (Math.PI * 2 / 5)) * 120,
                          }}
                          transition={{ 
                            duration: 0.8, 
                            delay: index * 0.2,
                            ease: "easeOut"
                          }}
                          whileHover={{ 
                            scale: 1.15, 
                            zIndex: 10,
                            boxShadow: "0 0 15px rgba(66, 153, 225, 0.6)",
                          }}
                          style={{
                            width: '48px',
                            height: '48px',
                          }}
                        >
                          <div className="text-blue-300 hover:text-blue-100 transition-colors duration-300">
                            {tech.icon}
                          </div>
                          
                          {/* Tooltip that appears on hover */}
                          <div className="absolute opacity-0 group-hover:opacity-100 bg-blue-900/90 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-300 whitespace-nowrap bottom-full mb-2">
                            {tech.name}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
          
          {/* Right Side - Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ScrollAnimation animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Technical Toolkit</h2>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <p className="text-lg text-gray-300 mb-4">
                A curated selection of technologies and tools I use to bring ideas to life.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                My expertise spans frontend development, UI/UX design, and backend technologies, allowing me to create complete, polished digital experiences from concept to deployment.
              </p>
              
              {/* Skills grid - redesigned with cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillCategories.map((category, categoryIndex) => (
                  <div 
                    key={category.name} 
                    className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-5 backdrop-blur-sm hover:bg-blue-900/30 transition-colors duration-300"
                  >
                    <h3 className="text-xl font-semibold text-blue-300 mb-4">{category.name}</h3>
                    
                    <div className="space-y-4">
                      {category.skills.map((skill, index) => {
                        const globalIndex = skillCategories.slice(0, categoryIndex).reduce(
                          (acc, cat) => acc + cat.skills.length, 0
                        ) + index;
                        
                        return (
                          <div key={skill.name} className="relative">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                {getIcon(skill.name)}
                                <span className="font-medium">{skill.name}</span>
                              </div>
                              <span className="text-sm text-gray-400 font-mono">{skill.level}%</span>
                            </div>
                            
                            {/* Skill progress bar */}
                            <div className="relative h-1.5 w-full bg-blue-900/40 rounded-full overflow-hidden">
                              <div 
                                className="skill-progress-bar absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                data-index={globalIndex}
                                style={{maxWidth: '100%'}}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>
        
        {/* Tool logos section */}
        <ScrollAnimation animation="fade-up" className="mt-24">
          <h3 className="text-2xl font-semibold text-center mb-10">Tools & Technologies</h3>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-w-4xl mx-auto">
            {techLogos.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-blue-900/20 rounded-xl flex items-center justify-center mb-2 border border-blue-500/20 group-hover:bg-blue-800/30 group-hover:border-blue-500/40 transition-all duration-300">
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    {tech.icon}
                  </div>
                </div>
                <span className="text-sm text-gray-300 text-center block">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};