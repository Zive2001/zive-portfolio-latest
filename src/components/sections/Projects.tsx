"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollAnimation } from '../animations/ScrollAnimations';
import { Button } from '../ui/Button';
import { ExternalLink, Github, ChevronRight, ChevronLeft, X } from 'lucide-react';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Project data
  const projects = [
    {
      id: 1,
      title: 'Immersive Portfolio',
      description: 'A creative portfolio website with 3D elements and advanced animations.',
      tags: ['React', 'Three.js', 'GSAP', 'Tailwind CSS'],
      image: '/images/project-placeholder.jpg',
      longDescription: 'This portfolio site showcases advanced web animations and 3D rendering capabilities. Built with React and Three.js, it features interactive 3D models, particle effects, and smooth scroll animations.',
      challenges: 'Optimizing 3D performance across devices while maintaining smooth animations was the primary challenge.',
      learnings: 'Deepened my understanding of WebGL and Three.js optimization techniques.',
      demoLink: 'https://example.com',
      githubLink: 'https://github.com',
    },
    {
      id: 2,
      title: 'E-Commerce Dashboard',
      description: 'A comprehensive admin dashboard for managing online stores.',
      tags: ['Next.js', 'TypeScript', 'Redux', 'Chart.js'],
      image: '/images/project-placeholder.jpg',
      longDescription: 'A feature-rich e-commerce dashboard with real-time analytics, inventory management, and order processing capabilities.',
      challenges: 'Creating an intuitive UX that handles complex data relationships while maintaining performance.',
      learnings: 'Improved my skills in state management and data visualization with chart libraries.',
      demoLink: 'https://example.com',
      githubLink: 'https://github.com',
    },
    {
      id: 3,
      title: 'Motion UI Library',
      description: 'A collection of reusable animated UI components for web applications.',
      tags: ['React', 'Framer Motion', 'Storybook', 'Jest'],
      image: '/images/project-placeholder.jpg',
      longDescription: 'A comprehensive library of animated UI components built with React and Framer Motion, including documentation and testing.',
      challenges: 'Ensuring animations were accessible and performed well across different browsers and devices.',
      learnings: 'Gained deeper knowledge of component architecture and animation optimization.',
      demoLink: 'https://example.com',
      githubLink: 'https://github.com',
    },
    {
      id: 4,
      title: 'Travel Planner App',
      description: 'An interactive travel planning application with map integration.',
      tags: ['React Native', 'Firebase', 'Google Maps API'],
      image: '/images/project-placeholder.jpg',
      longDescription: 'A mobile app that helps users plan trips, discover attractions, and create detailed itineraries with map integration.',
      challenges: 'Implementing offline capabilities and optimizing map performance on mobile devices.',
      learnings: 'Enhanced my mobile development skills and understanding of geolocation features.',
      demoLink: 'https://example.com',
      githubLink: 'https://github.com',
    },
  ];
  
  // Project detail modal
  const ProjectDetailModal = ({ project, onClose }: { project: typeof projects[0], onClose: () => void }) => {
    return (
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-blue-950/90 border border-blue-500/30 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 30 }}
        >
          {/* Header with close button */}
          <div className="flex justify-between items-center p-6 border-b border-blue-500/20">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900/50 text-gray-400 hover:bg-blue-800 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="bg-black/30 rounded-lg aspect-video mb-6 flex items-center justify-center">
              <p className="text-gray-400">Project Image Placeholder</p>
            </div>
            
            <div className="space-y-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-blue-500/20 rounded-full text-xs font-medium text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Overview</h4>
                <p className="text-gray-300">{project.longDescription}</p>
              </div>
              
              {/* Challenges & Learnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Challenges</h4>
                  <p className="text-gray-300 text-sm">{project.challenges}</p>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Learnings</h4>
                  <p className="text-gray-300 text-sm">{project.learnings}</p>
                </div>
              </div>
              
              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  icon={<ExternalLink size={16} />}
                  onClick={() => window.open(project.demoLink, '_blank')}
                >
                  Live Demo
                </Button>
                <Button
                  variant="outline"
                  icon={<Github size={16} />}
                  onClick={() => window.open(project.githubLink, '_blank')}
                >
                  View Code
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  
  // Scroll carousel functions
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const scrollAmount = direction === 'left' 
      ? -carouselRef.current.clientWidth / 2 
      : carouselRef.current.clientWidth / 2;
      
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-gradient-to-b from-blue-950/20 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300">
              Explore a selection of my recent work, showcasing various technologies and design approaches.
            </p>
          </div>
        </ScrollAnimation>
        
        {/* Projects carousel with controls */}
        <div className="relative">
          {/* Carousel navigation */}
          <div className="absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 hidden md:block">
            <button 
              onClick={() => scrollCarousel('left')}
              className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center text-gray-300 hover:bg-blue-800 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 hidden md:block">
            <button 
              onClick={() => scrollCarousel('right')}
              className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center text-gray-300 hover:bg-blue-800 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Projects carousel */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar"
          >
            {projects.map((project, index) => (
              <ScrollAnimation 
                key={project.id}
                animation="fade-up"
                delay={index * 0.1}
                className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] snap-center"
              >
                <motion.div 
                  className="bg-blue-900/10 border border-blue-500/20 rounded-xl overflow-hidden h-full"
                  whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(59, 130, 246, 0.5)' }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project image */}
                  <div className="aspect-video bg-black/30 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      Project Image
                    </div>
                    
                    {/* Overlay on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-blue-500/90 flex items-center justify-center opacity-0 transition-opacity"
                      whileHover={{ opacity: 1 }}
                    >
                      <button
                        onClick={() => setSelectedProject(project.id)}
                        className="px-4 py-2 bg-white text-blue-800 rounded-lg font-medium transform hover:scale-105 transition-transform"
                      >
                        View Details
                      </button>
                    </motion.div>
                  </div>
                  
                  {/* Project info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-blue-500/20 rounded-full text-xs font-medium text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      fullWidth 
                      onClick={() => setSelectedProject(project.id)}
                    >
                      Explore Project
                    </Button>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={projects.find(p => p.id === selectedProject)!}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};