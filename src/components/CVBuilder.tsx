import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Award, Download, Eye, Plus, Trash2, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import CVPreview from './CVBuilder/CVPreview';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Type definitions
interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa: string;
}

interface Skill {
  name: string;
  level: string;
}

const CVBuilder: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  });
  const [showPreview, setShowPreview] = useState(false);

  const steps = [
    { id: 0, name: 'Personal Info', icon: User },
    { id: 1, name: 'Experience', icon: Briefcase },
    { id: 2, name: 'Education', icon: GraduationCap },
    { id: 3, name: 'Skills', icon: Award },
  ];

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }]
    }));
  };

  const addSkill = () => {
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 'Intermediate' }]
    }));
  };

  type Section = 'experience' | 'education' | 'skills';
  const removeItem = (section: Section, index: number) => {
    setCvData(prev => {
      const arr = prev[section];
      if (Array.isArray(arr)) {
        return {
          ...prev,
          [section]: arr.filter((_, i) => i !== index)
        };
      }
      return prev;
    });
  };

  const updatePersonal = (field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map((exp: any, i: number) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map((edu: any, i: number) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const updateSkill = (index: number, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map((skill: any, i: number) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    // Validate personal information
    if (!cvData.personalInfo.fullName.trim()) errors.push('Name is required');
    if (!cvData.personalInfo.email.trim()) errors.push('Email is required');
    if (cvData.personalInfo.email && !/\S+@\S+\.\S+/.test(cvData.personalInfo.email)) {
      errors.push('Valid email is required');
    }
    
    // Validate experience
    if (cvData.experience.length === 0) errors.push('At least one work experience is required');
    
    // Validate education
    if (cvData.education.length === 0) errors.push('At least one education entry is required');
    
    // Validate skills
    if (cvData.skills.length === 0) errors.push('At least one skill is required');
    
    setValidationErrors(errors);
    setIsFormValid(errors.length === 0);
    return errors.length === 0;
  };

  React.useEffect(() => {
    validateForm();
  }, [cvData]);

  const handlePreview = () => {
    if (!isFormValid) {
      toast.error('Please complete all required fields before previewing.');
      return;
    }
    setShowPreview(true);
  };

  const handleDownload = async () => {
    setIsSaving(true);
    try {
      const previewElement = document.getElementById('cv-preview-modal-content');
      if (!previewElement) throw new Error('Preview element not found');
      const canvas = await html2canvas(previewElement);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('CV.pdf');
      toast.success('CV downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveCV = () => {
    // Save to localStorage instead of database
    localStorage.setItem('cvData', JSON.stringify(cvData));
    toast.success('CV saved successfully!');
  };

  const generateCV = async () => {
    if (validateForm()) {
      setIsSaving(true);
      try {
        // Save CV to localStorage instead of database
        localStorage.setItem('cvData', JSON.stringify(cvData));
        
        toast.success('CV saved and generated successfully! Download will start shortly.');
        
        // Here you would implement the actual CV generation/download logic
        // For now, we'll just show success
        
      } catch (error) {
        console.error('Error saving CV:', error);
        toast.error('Failed to save CV. Please try again.');
      } finally {
        setIsSaving(false);
      }
    } else {
      toast.error('Please complete all required fields before generating CV.');
    }
  };

  const previewCV = () => {
    if (validateForm()) {
      toast.success('Opening CV preview...');
      // Here you would implement the preview functionality
    } else {
      toast.error('Please complete all required fields before previewing.');
    }
  };

  return (
    <section id="builder" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Interactive CV Builder
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create your professional CV step by step with our guided builder. 
            Get real-time tips and suggestions as you build.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Step Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Build Your CV</h3>
              <div className="space-y-3">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      activeStep === step.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    <step.icon size={20} />
                    <span className="font-medium">{step.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePreview}
                  className={`w-full font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    isFormValid 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Eye size={16} />
                  <span>Preview</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    if (!isFormValid) {
                      toast.error('Please complete all required fields before downloading.');
                      return;
                    }
                    setShowPreview(true);
                    setTimeout(handleDownload, 500); // Show preview, then download
                  }}
                  disabled={isSaving}
                  className={`w-full font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    isFormValid && !isSaving
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-300 text-blue-100 cursor-not-allowed'
                  }`}
                >
                  {isSaving && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  <Download size={16} />
                  <span>{isSaving ? 'Saving...' : 'Save & Download CV'}</span>
                </motion.button>

                {/* Validation Status */}
                <div className={`p-3 rounded-lg text-sm ${
                  isFormValid 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {isFormValid ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span>CV is ready to generate!</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <XCircle size={16} className="text-red-600" />
                        <span>Please complete:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index} className="text-xs">{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              {/* Personal Information */}
              {activeStep === 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={cvData.personalInfo.fullName}
                        onChange={(e) => updatePersonal('fullName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={cvData.personalInfo.email}
                        onChange={(e) => updatePersonal('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john.doe@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={cvData.personalInfo.phone}
                        onChange={(e) => updatePersonal('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={cvData.personalInfo.address}
                        onChange={(e) => updatePersonal('address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="New York, NY"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Summary
                    </label>
                    <textarea
                      rows={4}
                      value={cvData.personalInfo.summary}
                      onChange={(e) => updatePersonal('summary', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Write a compelling 2-3 sentence summary of your professional background and career goals..."
                    />
                  </div>
                </div>
              )}

              {/* Experience */}
              {activeStep === 1 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Work Experience</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addExperience}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Experience</span>
                    </motion.button>
                  </div>
                  
                  <div className="space-y-6">
                    {cvData.experience.map((exp: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">Experience {index + 1}</h4>
                          <button
                            onClick={() => removeItem('experience', index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => updateExperience(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Software Developer"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Tech Company Inc."
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            rows={3}
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Describe your key responsibilities and achievements..."
                          />
                        </div>
                      </div>
                    ))}
                    
                    {cvData.experience.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>No work experience added yet. Click "Add Experience" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Education */}
              {activeStep === 2 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addEducation}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Education</span>
                    </motion.button>
                  </div>
                  
                  <div className="space-y-6">
                    {cvData.education.map((edu: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">Education {index + 1}</h4>
                          <button
                            onClick={() => removeItem('education', index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Bachelor of Science in Computer Science"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
                            <input
                              type="text"
                              value={edu.school}
                              onChange={(e) => updateEducation(index, 'school', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="University of Technology"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date</label>
                            <input
                              type="month"
                              value={edu.graduationDate}
                              onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                            <input
                              type="text"
                              value={edu.gpa}
                              onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="3.8/4.0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {cvData.education.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>No education added yet. Click "Add Education" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Skills */}
              {activeStep === 3 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Skills</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addSkill}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Skill</span>
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4">
                    {cvData.skills.map((skill: any, index: number) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="JavaScript"
                          />
                        </div>
                        
                        <div className="w-32">
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkill(index, 'level', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                        
                        <button
                          onClick={() => removeItem('skills', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    
                    {cvData.skills.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>No skills added yet. Click "Add Skill" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </motion.button>
                {activeStep < steps.length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    disabled={activeStep === steps.length - 1}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* CV Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
            <div id="cv-preview-modal-content">
              <CVPreview data={cvData} />
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download size={18} /> Download PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default CVBuilder;