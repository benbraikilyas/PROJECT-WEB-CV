import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, Palette, Stethoscope, GraduationCap, TrendingUp, Users, Wrench } from 'lucide-react';

const IndustryGuides: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('tech');

  const industries = [
    { id: 'tech', name: 'Technology', icon: Code, color: 'blue' },
    { id: 'business', name: 'Business', icon: Briefcase, color: 'green' },
    { id: 'creative', name: 'Creative', icon: Palette, color: 'purple' },
    { id: 'healthcare', name: 'Healthcare', icon: Stethoscope, color: 'red' },
    { id: 'education', name: 'Education', icon: GraduationCap, color: 'indigo' },
    { id: 'sales', name: 'Sales & Marketing', icon: TrendingUp, color: 'orange' },
    { id: 'hr', name: 'Human Resources', icon: Users, color: 'pink' },
    { id: 'engineering', name: 'Engineering', icon: Wrench, color: 'gray' },
  ];

  const industryGuides = {
    tech: {
      title: 'Technology & Software Development',
      description: 'Stand out in the competitive tech industry with a CV that showcases your technical skills and project experience.',
      keySkills: ['Programming Languages', 'Frameworks & Libraries', 'Databases', 'Cloud Platforms', 'DevOps Tools', 'Version Control'],
      cvStructure: [
        'Professional Summary (2-3 lines)',
        'Technical Skills (categorized)',
        'Professional Experience',
        'Projects Portfolio',
        'Education & Certifications',
        'Open Source Contributions (if any)'
      ],
      tips: [
        'Include GitHub profile and portfolio links',
        'Quantify your impact (performance improvements, user growth)',
        'Mention specific technologies and frameworks',
        'Highlight problem-solving abilities',
        'Include relevant side projects',
        'Show continuous learning through certifications'
      ],
      keywords: ['Agile', 'Scrum', 'API', 'Microservices', 'CI/CD', 'Cloud Computing', 'Machine Learning', 'Full Stack']
    },
    business: {
      title: 'Business & Management',
      description: 'Demonstrate your leadership skills and business acumen with a results-driven CV.',
      keySkills: ['Strategic Planning', 'Team Leadership', 'Budget Management', 'Process Improvement', 'Stakeholder Management', 'Data Analysis'],
      cvStructure: [
        'Executive Summary',
        'Core Competencies',
        'Professional Experience',
        'Key Achievements',
        'Education & MBA',
        'Professional Associations'
      ],
      tips: [
        'Lead with quantifiable business results',
        'Highlight team size and budget responsibility',
        'Show progression in leadership roles',
        'Include industry-specific metrics',
        'Mention cross-functional collaboration',
        'Demonstrate strategic thinking'
      ],
      keywords: ['ROI', 'KPIs', 'P&L', 'Strategic Planning', 'Change Management', 'Business Development', 'Stakeholder Management']
    },
    creative: {
      title: 'Creative & Design',
      description: 'Showcase your creativity and design thinking while maintaining professional standards.',
      keySkills: ['Design Software', 'Creative Concepts', 'Brand Development', 'User Experience', 'Visual Communication', 'Project Management'],
      cvStructure: [
        'Creative Summary',
        'Portfolio Highlights',
        'Professional Experience',
        'Skills & Software',
        'Education & Training',
        'Awards & Recognition'
      ],
      tips: [
        'Include link to online portfolio',
        'Show diverse project types',
        'Highlight client satisfaction and results',
        'Mention collaboration with other departments',
        'Include relevant software proficiency',
        'Show understanding of brand guidelines'
      ],
      keywords: ['Adobe Creative Suite', 'UI/UX', 'Brand Identity', 'Visual Design', 'Creative Direction', 'Typography', 'Color Theory']
    },
    healthcare: {
      title: 'Healthcare & Medical',
      description: 'Emphasize your clinical expertise, patient care experience, and medical qualifications.',
      keySkills: ['Clinical Skills', 'Patient Care', 'Medical Procedures', 'Healthcare Technology', 'Compliance', 'Emergency Response'],
      cvStructure: [
        'Professional Summary',
        'Licenses & Certifications',
        'Clinical Experience',
        'Education & Training',
        'Specializations',
        'Professional Memberships'
      ],
      tips: [
        'List all current licenses and certifications',
        'Highlight patient outcomes and satisfaction',
        'Include continuing education',
        'Mention specialized procedures or equipment',
        'Show compliance with healthcare regulations',
        'Include volunteer medical work'
      ],
      keywords: ['Patient Care', 'Clinical Excellence', 'HIPAA Compliance', 'EMR/EHR', 'Quality Improvement', 'Evidence-Based Practice']
    },
    education: {
      title: 'Education & Academia',
      description: 'Highlight your teaching philosophy, student outcomes, and educational innovations.',
      keySkills: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Educational Technology', 'Differentiated Instruction', 'Parent Communication'],
      cvStructure: [
        'Teaching Philosophy',
        'Education & Certifications',
        'Teaching Experience',
        'Curriculum Development',
        'Student Outcomes',
        'Professional Development'
      ],
      tips: [
        'Include student achievement data',
        'Highlight innovative teaching methods',
        'Show technology integration',
        'Mention parent and peer feedback',
        'Include professional development',
        'Show commitment to student success'
      ],
      keywords: ['Student-Centered Learning', 'Differentiated Instruction', 'Assessment', 'Curriculum Design', 'Educational Technology', 'Classroom Management']
    },
    sales: {
      title: 'Sales & Marketing',
      description: 'Demonstrate your ability to drive revenue and build relationships with quantifiable results.',
      keySkills: ['Lead Generation', 'Relationship Building', 'Negotiation', 'CRM Systems', 'Market Analysis', 'Digital Marketing'],
      cvStructure: [
        'Sales Summary',
        'Key Achievements',
        'Professional Experience',
        'Sales Metrics',
        'Education & Training',
        'Awards & Recognition'
      ],
      tips: [
        'Lead with sales numbers and percentages',
        'Show quota achievement and rankings',
        'Highlight client retention rates',
        'Include territory or market size',
        'Mention CRM and sales tools',
        'Show progression in targets and responsibilities'
      ],
      keywords: ['Revenue Growth', 'Lead Generation', 'Client Acquisition', 'Quota Achievement', 'Pipeline Management', 'ROI', 'Conversion Rates']
    },
    hr: {
      title: 'Human Resources',
      description: 'Showcase your people management skills and HR expertise in talent acquisition and employee development.',
      keySkills: ['Talent Acquisition', 'Employee Relations', 'Performance Management', 'HR Policies', 'Compensation & Benefits', 'Training & Development'],
      cvStructure: [
        'HR Professional Summary',
        'Core HR Competencies',
        'Professional Experience',
        'HR Achievements',
        'Education & Certifications',
        'Professional Associations'
      ],
      tips: [
        'Highlight employee satisfaction scores',
        'Show reduction in turnover rates',
        'Include diversity and inclusion initiatives',
        'Mention HRIS and HR technology',
        'Show compliance with employment law',
        'Include training program success metrics'
      ],
      keywords: ['Talent Management', 'Employee Engagement', 'HRIS', 'Compliance', 'Organizational Development', 'Performance Management']
    },
    engineering: {
      title: 'Engineering',
      description: 'Emphasize your technical expertise, project management skills, and engineering achievements.',
      keySkills: ['Technical Design', 'Project Management', 'Quality Assurance', 'Safety Compliance', 'CAD Software', 'Problem Solving'],
      cvStructure: [
        'Engineering Summary',
        'Technical Competencies',
        'Professional Experience',
        'Major Projects',
        'Education & PE License',
        'Professional Memberships'
      ],
      tips: [
        'Include PE license and certifications',
        'Highlight major project successes',
        'Show cost savings and efficiency improvements',
        'Mention safety record and compliance',
        'Include technical software proficiency',
        'Show cross-functional collaboration'
      ],
      keywords: ['Project Management', 'Technical Design', 'Quality Control', 'Safety Compliance', 'Process Improvement', 'CAD/CAM']
    }
  };

  const currentGuide = industryGuides[selectedIndustry as keyof typeof industryGuides];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Industry-Specific CV Guides
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each industry has unique requirements and expectations. Get tailored advice 
            for your specific field to maximize your chances of success.
          </p>
        </motion.div>

        {/* Industry Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setSelectedIndustry(industry.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedIndustry === industry.id
                  ? `bg-${industry.color}-600 text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <industry.icon size={20} />
              <span>{industry.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Industry Guide Content */}
        <motion.div
          key={selectedIndustry}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {currentGuide.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {currentGuide.description}
              </p>
            </div>

            {/* CV Structure */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6">
                Recommended CV Structure
              </h4>
              <div className="space-y-3">
                {currentGuide.cvStructure.map((section, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 font-medium">{section}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Tips */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-8">
              <h4 className="text-xl font-bold text-green-900 mb-6">
                Industry-Specific Tips
              </h4>
              <ul className="space-y-3">
                {currentGuide.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-green-800">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Skills */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Key Skills to Highlight
              </h4>
              <div className="space-y-2">
                {currentGuide.keySkills.map((skill, index) => (
                  <div key={index} className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-yellow-900 mb-4">
                Important Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentGuide.keywords.map((keyword, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="text-yellow-700 text-sm mt-4">
                Include these keywords naturally throughout your CV to improve ATS compatibility.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
              <h4 className="text-lg font-bold mb-3">
                Ready to Build Your CV?
              </h4>
              <p className="text-purple-100 text-sm mb-4">
                Use our industry-specific templates and builder to create your perfect CV.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Start Building
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryGuides;