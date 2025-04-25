"use client";
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollAnimation } from '../animations/ScrollAnimations';

import { Button } from '../ui/Button';
import { Send, Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset form after success
      setFormData({ name: '', email: '', message: '' });
      
      // Return to idle state after showing success message
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };
  
  // Field animation variants
  const fieldVariants = {
    focus: { scale: 1.02, boxShadow: '0 0 0 2px rgba(147, 51, 234, 0.3)' },
    blur: { scale: 1, boxShadow: 'none' },
  };
  
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollAnimation animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Get In Touch</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300">
              Have a project in mind or want to chat? Feel free to reach out!
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Contact form */}
          <ScrollAnimation animation="fade-right">
            <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 md:p-8">
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <motion.div
                      variants={fieldVariants}
                      initial="blur"
                      whileFocus="focus"
                      animate="blur"
                    >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg focus:outline-none text-white placeholder:text-gray-500"
                        placeholder="johndoe@example.com"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <motion.div
                      variants={fieldVariants}
                      initial="blur"
                      whileFocus="focus"
                      animate="blur"
                    >
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg focus:outline-none text-white placeholder:text-gray-500 resize-none"
                        placeholder="Hello, I'd like to discuss a project..."
                      />
                    </motion.div>
                  </div>
                  
                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={formStatus === 'submitting'}
                    icon={formStatus === 'submitting' ? (
                      <span className="animate-spin">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                            fill="none"
                          />
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </span>
                    ) : (
                      <Send size={18} />
                    )}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>
                  
                  {/* Form status messages */}
                  <AnimatedStatusMessage status={formStatus} />
                </div>
              </form>
            </div>
          </ScrollAnimation>
          
          {/* Contact info */}
          <ScrollAnimation animation="fade-left">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              {/* Contact details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a 
                      href="mailto:your.email@example.com" 
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      your.email@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-gray-400">San Francisco, CA</p>
                  </div>
                </div>
              </div>
              
              {/* Social links */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                <div className="flex items-center gap-4">
                  <motion.a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 hover:bg-purple-800/50 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={22} />
                  </motion.a>
                  <motion.a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 hover:bg-purple-800/50 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={22} />
                  </motion.a>
                  <motion.a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 hover:bg-purple-800/50 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter size={22} />
                  </motion.a>
                </div>
              </div>
              
              {/* Availability note */}
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Currently Available
                </h4>
                <p className="text-sm text-gray-400">
                  I'm currently available for freelance work and open to discussing new projects or opportunities.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

// Animated status message component
const AnimatedStatusMessage = ({ status }: { status: 'idle' | 'submitting' | 'success' | 'error' }) => {
  return (
    <AnimatePresence>
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center text-green-400"
        >
          Thank you! Your message has been sent successfully.
        </motion.div>
      )}
      
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-center text-red-400"
        >
          Oops! Something went wrong. Please try again later.
        </motion.div>
      )}
    </AnimatePresence>
  );
};