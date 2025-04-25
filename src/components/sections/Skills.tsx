"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollAnimation } from '../animations/ScrollAnimations';
import gsap from 'gsap';

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Skill categories with items
  const skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 90, icon: '⚛️' },
        { name: 'TypeScript', level: 85, icon: '📘' },
        { name: 'Next.js', level: 80, icon: '▲' },
        { name: 'CSS/SCSS', level: 90, icon: '🎨' },
        { name: 'Framer Motion', level: 85, icon: '🔄' },
      ]
    },
    {
      name: 'Design',
      skills: [
        { name: 'Figma', level: 90, icon: '🖌️' },
        { name: 'UI/UX', level: 85, icon: '📱' },
        { name: 'Animation', level: 75, icon: '✨' },
        { name: 'Responsive Design', level: 90, icon: '📊' },
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 75, icon: '🟢' },
        { name: 'GraphQL', level: 70, icon: '◢' },
        { name: 'RESTful APIs', level: 80, icon: '🔌' },
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
  
  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="relative py-24 md:py-32 bg-background"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollAnimation animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Technical Toolkit</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300">
              A curated selection of technologies and tools I use to bring ideas to life.
            </p>
          </div>
        </ScrollAnimation>
        
        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <ScrollAnimation 
              key={category.name} 
              animation="fade-up" 
              delay={categoryIndex * 0.1} 
              className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm hover:bg-blue-900/20 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-6">{category.name}</h3>
              
              <div className="space-y-5">
                {category.skills.map((skill, index) => {
                  const globalIndex = skillCategories.slice(0, categoryIndex).reduce(
                    (acc, cat) => acc + cat.skills.length, 0
                  ) + index;
                  
                  return (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="mr-2">{skill.icon}</span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      
                      <div className="h-2 bg-blue-900/30 rounded-full overflow-hidden">
                        <div 
                          className="skill-progress-bar h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-0"
                          data-index={globalIndex}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollAnimation>
          ))}
        </div>
        
        {/* Tool logos section */}
        <ScrollAnimation animation="fade-up" className="mt-20">
          <h3 className="text-2xl font-semibold text-center mb-10">Tools & Technologies</h3>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {['React', 'TypeScript', 'Next.js', 'Tailwind', 'GSAP', 'Framer Motion', 'Three.js', 'Figma', 'Node.js', 'Git'].map((tool, index) => (
              <motion.div
                key={tool}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center mb-2 border border-blue-500/20">
                  <span className="text-2xl">{tool.charAt(0)}</span>
                </div>
                <span className="text-sm text-gray-300">{tool}</span>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};