import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Search, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';

const ATSOptimization: React.FC = () => {
  const atsFeatures = [
    {
      icon: Search,
      title: 'Keyword Scanning',
      description: 'ATS systems scan for specific keywords related to the job requirements',
      tip: 'Include exact keywords from the job description in your CV'
    },
    {
      icon: FileText,
      title: 'Format Parsing',
      description: 'Systems extract information from different CV sections and formats',
      tip: 'Use standard section headings like "Experience", "Education", "Skills"'
    },
    {
      icon: Bot,
      title: 'Ranking Algorithm',
      description: 'Candidates are ranked based on keyword matches and relevance scores',
      tip: 'Aim for 70-80% keyword match with the job description'
    }
  ];

  const dosAndDonts = {
    dos: [
      'Use standard section headings (Experience, Education, Skills)',
      'Include exact keywords from job descriptions',
      'Save your CV as a PDF or Word document',
      'Use simple, clean formatting',
      'Include your contact information at the top',
      'Use bullet points for easy scanning',
      'Spell out acronyms (e.g., "Search Engine Optimization (SEO)")',
      'Include relevant certifications and licenses'
    ],
    donts: [
      'Use images, graphics, or complex designs',
      'Put important information in headers or footers',
      'Use tables or columns for layout',
      'Include special characters or symbols',
      'Use creative section names like "My Journey"',
      'Submit as a JPEG or PNG image',
      'Use fancy fonts or multiple font types',
      'Include personal information like photos or age'
    ]
  };

  const atsChecklist = [
    { item: 'Contact information at the top', checked: true },
    { item: 'Standard section headings used', checked: true },
    { item: 'Keywords from job description included', checked: false },
    { item: 'Simple, clean formatting', checked: true },
    { item: 'No images or graphics', checked: true },
    { item: 'Saved as PDF or Word document', checked: false },
    { item: 'Bullet points used consistently', checked: true },
    { item: 'No information in headers/footers', checked: false }
  ];

  const keywordExamples = [
    {
      role: 'Software Developer',
      keywords: ['JavaScript', 'React', 'Node.js', 'API', 'Agile', 'Git', 'MongoDB', 'AWS']
    },
    {
      role: 'Marketing Manager',
      keywords: ['SEO', 'PPC', 'Google Analytics', 'Lead Generation', 'Brand Management', 'Social Media']
    },
    {
      role: 'Project Manager',
      keywords: ['Scrum', 'Agile', 'Stakeholder Management', 'Risk Assessment', 'Budget Management', 'PMP']
    },
    {
      role: 'Data Analyst',
      keywords: ['SQL', 'Python', 'Tableau', 'Data Visualization', 'Statistical Analysis', 'Excel']
    }
  ];

  return (
    <section id="ats" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ATS Optimization Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            90% of large companies use Applicant Tracking Systems (ATS) to filter CVs. 
            Learn how to optimize your CV to pass these automated screenings.
          </p>
        </motion.div>

        {/* How ATS Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How ATS Systems Work
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {atsFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                  <p className="text-blue-800 text-sm font-medium">
                    💡 {feature.tip}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dos and Don'ts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Dos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-green-50 border border-green-200 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
              <CheckCircle className="w-8 h-8 mr-3" />
              ATS-Friendly Practices
            </h3>
            <ul className="space-y-3">
              {dosAndDonts.dos.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Don'ts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-red-50 border border-red-200 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center">
              <XCircle className="w-8 h-8 mr-3" />
              Things to Avoid
            </h3>
            <ul className="space-y-3">
              {dosAndDonts.donts.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-red-800">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ATS Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-8 shadow-lg mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
            ATS Readiness Checklist
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {atsChecklist.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                {item.checked ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`${item.checked ? 'text-green-800' : 'text-red-800'} font-medium`}>
                  {item.item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Keyword Examples */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-50 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Industry-Specific Keywords
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {keywordExamples.map((example, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  {example.role}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {example.keywords.map((keyword, keyIndex) => (
                    <span
                      key={keyIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-blue-800 font-medium">
              💡 Research job descriptions in your field to find the most relevant keywords for your industry.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ATSOptimization;