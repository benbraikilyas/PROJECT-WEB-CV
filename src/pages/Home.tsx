import React, { useState, useEffect } from 'react';
import { checkImagePath } from '../utils/imageChecker';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  // Removed unused imageError state
  useEffect(() => {
    const verifyImage = async () => {
      try {
        await checkImagePath('/images/CV.png');
        console.log('Image path is valid');
      } catch (error) {
        console.error('Image path verification failed:', error);
      }
    };

    verifyImage();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background with new teal gradient */}
      <div className="fixed inset-0 z-0 bg-hero-gradient" />

      {/* Debug Info - Remove in production */}
      {/* Removed imageError debug info */}

      {/* Content */}
      <div className="relative z-10 pt-20 px-4">
        <div className="max-w-7xl mx-auto text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Transform Your <br/>
            <span className="text-cv-teal-light">Career Story</span>
          </motion.h1>
          {/* ...existing content... */}
        </div>
      </div>
    </div>
  );
};

export default Home;