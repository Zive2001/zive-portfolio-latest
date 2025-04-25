"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollAnimation } from '../animations/ScrollAnimations';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      text: "Working with this developer was a game-changer for our project. The attention to detail and creative solutions brought our vision to life in ways we hadn't imagined.",
      avatar: '/images/avatar-placeholder.jpg',
    },
    {
      id: 2,
      name: 'Sarah Miller',
      role: 'Creative Director',
      company: 'Design Studio',
      text: 'An exceptional talent who combines technical expertise with a keen eye for design. The work delivered exceeded our expectations in both functionality and aesthetics.',
      avatar: '/images/avatar-placeholder.jpg',
    },
    {
      id: 3,
      name: 'James Wilson',
      role: 'Startup Founder',
      company: 'InnovateTech',
      text: 'I was impressed by the ability to translate complex requirements into elegant solutions. The development process was smooth, and the end result has received amazing feedback from our users.',
      avatar: '/images/avatar-placeholder.jpg',
    },
  ];
  
  // Handle navigation
  const navigate = (newDirection: number) => {
    setAutoplay(false);
    setDirection(newDirection);
    
    if (newDirection === 1) {
      setCurrentIndex(prevIndex => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentIndex(prevIndex => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    }
  };
  
  // Autoplay effect
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prevIndex => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  // Variants for testimonial animations
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };
  
  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-gradient-to-b from-purple-950/10 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Client Testimonials</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300">
              Feedback from people I've had the pleasure of working with.
            </p>
          </div>
        </ScrollAnimation>
        
        {/* Testimonials carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-12 z-10 transform -translate-y-1/2">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center text-gray-300 hover:bg-purple-800 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-12 z-10 transform -translate-y-1/2">
            <button 
              onClick={() => navigate(1)}
              className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center text-gray-300 hover:bg-purple-800 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Testimonial slider */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 md:p-10 h-[300px] md:h-[280px] overflow-hidden relative">
            {/* Large quote icon */}
            <div className="absolute top-6 right-6 text-purple-500/20">
              <Quote size={80} />
            </div>
            
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'tween', duration: 0.5 }}
                className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center"
              >
                <p className="text-lg md:text-xl text-gray-300 mb-8 relative z-10">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mr-4 flex items-center justify-center text-white font-medium">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-gray-400">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  setAutoplay(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-purple-500 w-6' 
                    : 'bg-purple-500/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};