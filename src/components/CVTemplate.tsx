import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Star, Filter } from 'lucide-react';

const CVTemplate: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  // Add this mock data
  const templates = [
    {
      id: 1,
      name: "Professional CV",
      description: "Clean and modern professional CV template",
      image: "/path/to/image.jpg",
      price: "Free",
      rating: 4.5,
      features: ["ATS-Friendly", "Modern Design", "Customizable"],
    },
    {
      id: 2,
      name: 'Executive Professional',
      category: 'executive',
      rating: 4.9,
      downloads: 15420,
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Perfect for senior management and C-level positions',
      features: ['ATS Optimized', 'Executive Summary', 'Achievement Focus'],
      price: 'Free'
    },
    {
      id: 3,
      name: 'Tech Developer',
      category: 'tech',
      rating: 4.8,
      downloads: 23150,
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Designed for software developers and IT professionals',
      features: ['Skills Matrix', 'Project Portfolio', 'GitHub Integration'],
      price: 'Free'
    },
    {
      id: 4,
      name: 'Creative Designer',
      category: 'creative',
      rating: 4.7,
      downloads: 18900,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Ideal for designers, artists, and creative professionals',
      features: ['Portfolio Showcase', 'Visual Appeal', 'Brand Colors'],
      price: 'Premium'
    },
    {
      id: 5,
      name: 'Fresh Graduate',
      category: 'entry',
      rating: 4.6,
      downloads: 31200,
      image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Perfect for new graduates and entry-level positions',
      features: ['Education Focus', 'Skills Highlight', 'Clean Layout'],
      price: 'Free'
    },
    {
      id: 6,
      name: 'Sales Professional',
      category: 'sales',
      rating: 4.8,
      downloads: 12800,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Optimized for sales, marketing, and business development',
      features: ['Results Driven', 'Metrics Focus', 'Client Success'],
      price: 'Free'
    },
    {
      id: 7,
      name: 'Healthcare Professional',
      category: 'healthcare',
      rating: 4.9,
      downloads: 9650,
      image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Tailored for medical and healthcare professionals',
      features: ['Certification Focus', 'Clinical Experience', 'Professional'],
      price: 'Premium'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'executive', name: 'Executive', count: templates.filter(t => t.category === 'executive').length },
    { id: 'tech', name: 'Technology', count: templates.filter(t => t.category === 'tech').length },
    { id: 'creative', name: 'Creative', count: templates.filter(t => t.category === 'creative').length },
    { id: 'entry', name: 'Entry Level', count: templates.filter(t => t.category === 'entry').length },
    { id: 'sales', name: 'Sales', count: templates.filter(t => t.category === 'sales').length },
    { id: 'healthcare', name: 'Healthcare', count: templates.filter(t => t.category === 'healthcare').length },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const TemplateCard: React.FC<{ template: any }> = ({ template }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={template.image}
          alt={template.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            template.price === 'Free' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {template.price}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-xs font-semibold">{template.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {template.name}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm">
          {template.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {template.features.map((feature: string) => (
            <span
              key={feature}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{template.downloads?.toLocaleString()} downloads</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{template.rating}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTemplate(template)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-1"
          >
            <Eye size={16} />
            <span>Preview</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-1"
          >
            <Download size={16} />
            <span>Download</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="templates" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CVTemplate;