import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Mail, Clock } from 'lucide-react';
import portfolioConfig from '../lib/portfolio-config.json';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About Me
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="w-24 h-1 bg-blue-600 mx-auto"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <motion.img
              src={portfolioConfig.personal.profileImage}
              alt={portfolioConfig.personal.name}
              className="w-64 h-64 rounded-full object-cover mx-auto lg:mx-0 mb-8 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <MapPin size={20} className="text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  {portfolioConfig.personal.location}
                </span>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <Mail size={20} className="text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  {portfolioConfig.personal.email}
                </span>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <Clock size={20} className="text-green-600" />
                <span className="text-green-600 font-medium">
                  {portfolioConfig.personal.availability}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {portfolioConfig.personal.bio}
            </p>
            
            <motion.a
              href={portfolioConfig.personal.cvUrl}
              download
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              <span>Download CV</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {portfolioConfig.stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-blue-600 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;