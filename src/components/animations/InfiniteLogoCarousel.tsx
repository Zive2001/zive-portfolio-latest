"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface InfiniteLogoCarouselProps {
  children: React.ReactNode[];
  duration?: number;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
}

export const InfiniteLogoCarousel: React.FC<InfiniteLogoCarouselProps> = ({
  children,
  duration = 30,
  pauseOnHover = true,
  direction = 'left'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full overflow-hidden relative">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={containerRef}
        className={`flex gap-6 ${pauseOnHover ? 'hover:pause' : ''}`}
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: duration,
            ease: 'linear'
          }
        }}
        style={{
          width: 'max-content'
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : {}}
      >
        {/* Original logos */}
        {children.map((child, index) => (
          <div key={`original-${index}`} className="flex-shrink-0">
            {child}
          </div>
        ))}

        {/* Duplicate logos for seamless loop */}
        {children.map((child, index) => (
          <div key={`duplicate-${index}`} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};