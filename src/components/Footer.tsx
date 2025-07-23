import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Target, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Services',
      links: [
        'CV Analysis',
        'Professional Templates',
        'ATS Optimization',
        'Career Coaching',
        'LinkedIn Optimization',
        'Interview Preparation'
      ]
    },
    {
      title: 'Resources',
      links: [
        'CV Writing Tips',
        'Industry Guides',
        'Salary Negotiation',
        'Job Search Strategy',
        'Career Blog',
        'Success Stories'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Our Team',
        'Testimonials',
        'Pricing',
        'Contact',
        'Privacy Policy'
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gradient-to-br from-deep-forest to-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <FileText className="w-10 h-10 text-sage-green" />
                <Target className="w-4 h-4 text-medium-green absolute -top-1 -right-1" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  CV Pro
                </h3>
                <p className="text-sage-green text-sm font-medium">
                  Career Success
                </p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Empowering professionals worldwide to achieve their career goals through 
              expert CV optimization, career coaching, and job search strategies.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-sage-green" />
                <span className="text-gray-300">123 Career Street, NY 10001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-sage-green" />
                <span className="text-gray-300">+1 (555) 123-JOBS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-sage-green" />
                <span className="text-gray-300">hello@cvpro.com</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-sage-green">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-sage-green transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 mb-8"
        >
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4 text-sage-green">
              Stay Updated with Career Tips
            </h4>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get weekly career advice, CV tips, and job market insights delivered to your inbox.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
              <button className="px-6 py-3 bg-forest-green hover:bg-deep-forest text-white font-semibold rounded-r-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 md:mb-0"
            >
              <p className="text-gray-400 text-sm">
                © {currentYear} CV Pro. All rights reserved. Transforming careers since 2020.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-sage-green transition-colors duration-300"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon size={20} />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
              
              {/* Scroll to Top */}
              <motion.button
                onClick={scrollToTop}
                className="ml-4 p-2 bg-gray-700 hover:bg-sage-green/20 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp size={16} className="text-sage-green" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;