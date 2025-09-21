"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollAnimation } from '../animations/ScrollAnimations';
import LaserFlow from '../animations/LaserFlow';
import gsap from 'gsap';

export const Creative = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  
  // Creative works/doodles data
  const creativeWorks = [
    { id: 1, title: 'Abstract Animation', category: 'Animation' },
    { id: 2, title: 'Digital Illustration', category: 'Design' },
    { id: 3, title: 'UI Concept', category: 'UI/UX' },
    { id: 4, title: 'Character Design', category: 'Illustration' },
    { id: 5, title: 'Motion Graphics', category: 'Animation' },
    { id: 6, title: 'Experimental UI', category: 'UI/UX' },
  ];
  
  // GSAP animation for cards
  useEffect(() => {
    const cards = document.querySelectorAll('.creative-card');
    
    gsap.fromTo(
      cards,
      { 
        y: 50, 
        opacity: 0,
        rotate: () => gsap.utils.random(-5, 5)
      },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );
  }, []);
  
  return (
    <section 
      id="creative" 
      ref={sectionRef} 
      className="relative py-24 md:py-32 bg-gradient-to-b from-background to-purple-950/10"
    >
      <motion.div 
        className="container mx-auto px-4 md:px-6"
        style={{ opacity: opacitySection }}
      >
        <ScrollAnimation animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Creative Corner</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300">
              A showcase of my creative explorations, doodles, and experimental designs.
            </p>
          </div>
        </ScrollAnimation>

        {/* LaserFlow Background Effect */}
        <div className="relative mb-16" style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
          <LaserFlow
            horizontalBeamOffset={0.1}
            verticalBeamOffset={0.0}
            color="#10A4EA"
            wispDensity={1.2}
            flowStrength={0.8}
            fogIntensity={0.4}
          />

          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '86%',
            height: '60%',
            backgroundColor: 'rgba(6, 0, 16, 0.8)',
            borderRadius: '20px',
            border: '2px solid #10A4EA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'white',
            fontSize: '2rem',
            zIndex: 6,
            backdropFilter: 'blur(10px)',
          }}>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interactive Experience
            </h3>
            <p className="text-blue-200 text-lg">Powered by Advanced Shaders & WebGL</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {creativeWorks.map((work, index) => (
              <motion.div
                key={work.id}
                className="creative-card aspect-square relative rounded-xl overflow-hidden"
                whileHover={{ scale: 1.03, zIndex: 10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Random gradient backgrounds for placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  index % 3 === 0 ? 'from-blue-600 to-purple-600' :
                  index % 3 === 1 ? 'from-purple-600 to-pink-600' :
                  'from-pink-600 to-blue-600'
                } opacity-70`} />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-medium px-2 py-1 bg-purple-500/30 rounded-full text-purple-200 mb-2 inline-block">
                      {work.category}
                    </span>
                    <h3 className="text-lg font-medium text-white">{work.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <ScrollAnimation animation="fade-up" className="mt-12 text-center">
          <p className="text-gray-300 mb-4">
            Interested in my creative process or looking for a collaboration?
          </p>
          <a 
            href="#contact" 
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Let's Create Together
          </a>
        </ScrollAnimation>
      </motion.div>
    </section>
  );
};