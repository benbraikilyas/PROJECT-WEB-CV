import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Target, TrendingUp, Award, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: FileText, label: 'CVs Improved', value: '10,000+' },
    { icon: Target, label: 'Job Success Rate', value: '85%' },
    { icon: TrendingUp, label: 'Salary Increase', value: '30%' },
    { icon: Award, label: 'Industry Awards', value: '15+' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-earth-50 via-white to-warm-beige/20"></div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-32 left-10 text-sage-green/60"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <FileText size={60} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-10 text-medium-green/60"
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <Target size={50} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Main Headline */}
          <motion.div 
            className="mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
              Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-green to-deep-forest block">
                Career Story
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-gray-600">
              Professional CV Optimization & Career Success
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Get noticed by recruiters, pass ATS systems, and land your dream job with our 
            expert CV improvement strategies and templates.
          </motion.p>

          {/* Key Benefits */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-sage-green/20">
              <Target className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">ATS Optimized</h3>
              <p className="text-gray-600 text-sm">Beat applicant tracking systems with keyword optimization</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-sage-green/20">
              <TrendingUp className="w-8 h-8 text-medium-green mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Higher Response</h3>
              <p className="text-gray-600 text-sm">85% of our users get more interview calls</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-sage-green/20">
              <Award className="w-8 h-8 text-deep-forest mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Expert Reviewed</h3>
              <p className="text-gray-600 text-sm">Templates created by HR professionals</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <motion.button
              onClick={() => scrollToSection('analysis')}
              className="px-8 py-4 bg-forest-green hover:bg-deep-forest text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Analyze My CV</span>
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('templates')}
              className="px-8 py-4 border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Templates
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
              >
                <stat.icon className="w-8 h-8 text-forest-green mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-medium-green rounded-full flex justify-center">
            <div className="w-1 h-3 bg-medium-green rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;