import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const CVTips: React.FC = () => {
  const [activeTab, setActiveTab] = useState('content');

  const tipCategories = [
    { id: 'content', name: 'Content', icon: Lightbulb },
    { id: 'formatting', name: 'Formatting', icon: Target },
    { id: 'keywords', name: 'Keywords', icon: TrendingUp },
    { id: 'mistakes', name: 'Common Mistakes', icon: Users },
  ];

  const tips = {
    content: [
      {
        title: 'Write a Compelling Professional Summary',
        description: 'Start with a 3-4 line summary that highlights your key achievements and career goals.',
        example: '"Results-driven Marketing Manager with 5+ years of experience increasing brand awareness by 150% and generating $2M+ in revenue through digital campaigns."'
      },
      {
        title: 'Quantify Your Achievements',
        description: 'Use numbers, percentages, and metrics to demonstrate your impact.',
        example: 'Instead of "Improved sales" write "Increased sales by 35% over 12 months, generating $500K additional revenue"'
      },
      {
        title: 'Use Action Verbs',
        description: 'Start bullet points with strong action verbs to show initiative and results.',
        example: 'Led, Implemented, Achieved, Optimized, Developed, Streamlined, Increased, Reduced'
      },
      {
        title: 'Tailor for Each Application',
        description: 'Customize your CV for each job by highlighting relevant skills and experiences.',
        example: 'Match 70-80% of the job requirements in your CV content and keywords.'
      }
    ],
    formatting: [
      {
        title: 'Keep It Clean and Professional',
        description: 'Use consistent fonts, spacing, and formatting throughout your CV.',
        example: 'Stick to 1-2 professional fonts like Arial, Calibri, or Times New Roman.'
      },
      {
        title: 'Optimal Length',
        description: 'Keep your CV to 1-2 pages maximum, focusing on the most relevant information.',
        example: '1 page for entry-level, 2 pages for experienced professionals, never more than 2 pages.'
      },
      {
        title: 'Use White Space Effectively',
        description: 'Ensure your CV is easy to read with proper margins and spacing.',
        example: 'Use 0.5-1 inch margins and 1.15-1.5 line spacing for optimal readability.'
      },
      {
        title: 'Consistent Date Formatting',
        description: 'Use the same date format throughout your CV.',
        example: 'Choose either "Jan 2020 - Dec 2022" or "01/2020 - 12/2022" and stick to it.'
      }
    ],
    keywords: [
      {
        title: 'Research Industry Keywords',
        description: 'Study job descriptions in your field to identify commonly used terms and skills.',
        example: 'For tech roles: "Agile", "Scrum", "API", "Cloud Computing", "Machine Learning"'
      },
      {
        title: 'Include Technical Skills',
        description: 'List relevant software, programming languages, and technical competencies.',
        example: 'Create a dedicated "Technical Skills" section with tools and technologies you know.'
      },
      {
        title: 'Use Industry Jargon Appropriately',
        description: 'Include field-specific terminology that recruiters and ATS systems look for.',
        example: 'Marketing: "SEO", "PPC", "Conversion Rate", "Lead Generation", "Brand Management"'
      },
      {
        title: 'Natural Keyword Integration',
        description: 'Incorporate keywords naturally into your experience descriptions.',
        example: 'Don\'t just list keywords - weave them into meaningful sentences about your work.'
      }
    ],
    mistakes: [
      {
        title: 'Avoid Generic Objectives',
        description: 'Replace outdated objective statements with a professional summary.',
        example: 'Instead of "Seeking a challenging position" write about what you can offer the employer.'
      },
      {
        title: 'Don\'t Include Personal Information',
        description: 'Avoid photos, age, marital status, or other personal details unless required.',
        example: 'Focus on professional qualifications, not personal characteristics.'
      },
      {
        title: 'Proofread Thoroughly',
        description: 'Spelling and grammar errors can immediately disqualify your application.',
        example: 'Use spell-check, read aloud, and have someone else review your CV.'
      },
      {
        title: 'Avoid Overused Buzzwords',
        description: 'Replace generic terms with specific, measurable achievements.',
        example: 'Instead of "team player" or "hard worker", show specific examples of collaboration and results.'
      }
    ]
  };

  const quickTips = [
    'Use a professional email address',
    'Include your LinkedIn profile URL',
    'Save as PDF to preserve formatting',
    'Use consistent bullet points',
    'Include relevant certifications',
    'Update contact information',
    'Remove outdated skills',
    'Use reverse chronological order'
  ];

  return (
    <section id="tips" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Expert CV Writing Tips
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn from HR professionals and recruiters. These proven strategies will help you 
            create a CV that stands out and gets you more interviews.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Categories</h3>
              <div className="space-y-2">
                {tipCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      activeTab === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <category.icon size={20} />
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="mt-8">
                <h4 className="font-bold text-gray-900 mb-4">Quick Tips</h4>
                <div className="space-y-2">
                  {quickTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {tips[activeTab as keyof typeof tips].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    {tip.title}
                  </h4>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {tip.description}
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="text-blue-800 font-medium text-sm">
                      <strong>Example:</strong> {tip.example}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Apply These Tips?</h3>
              <p className="text-blue-100 mb-6">
                Use our CV builder to implement these strategies and create a professional CV in minutes.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2 mx-auto"
              >
                <span>Start Building Your CV</span>
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CVTips;