"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-blue-950/30 border-t border-blue-500/20 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Name */}
          <div className="mb-4 md:mb-0">
            <motion.div
              className="text-xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <span className="gradient-text">YourName</span>
            </motion.div>
          </div>
          
          {/* Center items */}
          <div className="text-center mb-4 md:mb-0">
            <p className="text-sm text-gray-400 flex items-center justify-center">
              Crafted with 
              <motion.span 
                className="mx-1 text-red-400" 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart size={14} fill="currentColor" />
              </motion.span>
              using React & Next.js
            </p>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            &copy; {currentYear} YourName. All rights reserved.
          </div>
        </div>
        
        {/* Quick links */}
        <div className="mt-6 pt-6 border-t border-blue-500/10">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li>
              <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Home</a>
            </li>
            <li>
              <a href="#about" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">About</a>
            </li>
            <li>
              <a href="#skills" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Skills</a>
            </li>
            <li>
              <a href="#projects" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Projects</a>
            </li>
            <li>
              <a href="#creative" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Creative</a>
            </li>
            <li>
              <a href="#contact" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};