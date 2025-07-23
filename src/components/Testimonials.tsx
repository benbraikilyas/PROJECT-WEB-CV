import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import portfolioConfig from '../lib/portfolio-config.json';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  avatar: string;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
    >
      <div className="absolute -top-4 left-8">
        <div className="bg-blue-600 rounded-full p-3">
          <Quote size={20} className="text-white" />
        </div>
      </div>
      
      <div className="pt-4">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < testimonial.rating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          "{testimonial.feedback}"
        </p>
        
        <div className="flex items-center">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {testimonial.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = portfolioConfig.testimonials as Testimonial[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section id="testimonials" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
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
            What People Say
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="w-24 h-1 bg-blue-600 mx-auto mb-8"
          />
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Don't just take my word for it. Here's what colleagues and clients have to say about working with me.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;