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
    photo: string; // New field for photo URL
    socialMedia: {
      linkedin: string;
      github: string;
      website: string;
    };
    additionalInfo: string; // New field for additional info
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[]; // New field for certifications
  languages: Language[]; // New field for languages
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

interface Certification {
  name: string;
  issuingOrganization: string;
  date: string;
}

interface Language {
  name: string;
  proficiency: string;
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
      summary: '',
      photo: '', // Initialize new photo field
      socialMedia: {
        linkedin: '',
        github: '',
        website: '',
      },
      additionalInfo: '', // Initialize new additional info field
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [], // Initialize new certifications field
    languages: [] // Initialize new languages field
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false); // New state for Markdown preview
  const [selectedTheme, setSelectedTheme] = useState('blue'); // New state for theme selection, default to 'blue'

  const steps = [
    { id: 0, name: 'Personal Info', icon: User },
    { id: 1, name: 'Experience', icon: Briefcase },
    { id: 2, name: 'Education', icon: GraduationCap },
    { id: 3, name: 'Skills', icon: Award },
    { id: 4, name: 'Certifications', icon: Award }, // New step for Certifications
    { id: 5, name: 'Languages', icon: Award }, // New step for Languages
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

  const addCertification = () => {
    setCvData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: '', issuingOrganization: '', date: '' }]
    }));
  };

  const addLanguage = () => {
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, { name: '', proficiency: 'Intermediate' }]
    }));
  };

  type Section = 'experience' | 'education' | 'skills' | 'certifications' | 'languages';
  const removeItem = (section: Section, index: number) => {
    setCvData(prev => {
      const arr = prev[section as keyof CVData];
      if (Array.isArray(arr)) {
        return {
          ...prev,
          [section]: arr.filter((_, i) => i !== index)
        };
      }
      return prev;
    });
  };

  const updatePersonal = (field: string, value: string | File) => {
    setCvData(prev => {
      if (field === 'photo' && value instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCvData(current => ({
            ...current,
            personalInfo: { ...current.personalInfo, photo: reader.result as string }
          }));
        };
        reader.readAsDataURL(value);
        return prev;
      } else if (field.startsWith('socialMedia.')) {
        const socialField = field.split('.')[1];
        return {
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            socialMedia: {
              ...prev.personalInfo.socialMedia,
              [socialField]: value as string
            }
          }
        };
      } else {
        return {
          ...prev,
          personalInfo: { ...prev.personalInfo, [field]: value as string }
        };
      }
    });
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

  const updateCertification = (index: number, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert: any, i: number) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map((lang: any, i: number) => 
        i === index ? { ...lang, [field]: value } : lang
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
    
    // Validate certifications
    if (cvData.certifications.length === 0) errors.push('At least one certification entry is required');

    // Validate languages
    if (cvData.languages.length === 0) errors.push('At least one language entry is required');

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

  const generateMarkdownCV = () => {
    let markdown = `# ${cvData.personalInfo.fullName}\n\n`;
    markdown += `**Contact Information:**\n`;
    markdown += `- Email: ${cvData.personalInfo.email}\n`;
    markdown += `- Phone: ${cvData.personalInfo.phone}\n`;
    markdown += `- Address: ${cvData.personalInfo.address}\n`;

    if (cvData.personalInfo.socialMedia.linkedin) markdown += `- LinkedIn: ${cvData.personalInfo.socialMedia.linkedin}\n`;
    if (cvData.personalInfo.socialMedia.github) markdown += `- GitHub: ${cvData.personalInfo.socialMedia.github}\n`;
    if (cvData.personalInfo.socialMedia.website) markdown += `- Website: ${cvData.personalInfo.socialMedia.website}\n`;
    markdown += `\n`;

    if (cvData.personalInfo.summary) {
      markdown += `## Professional Summary\n`;
      markdown += `${cvData.personalInfo.summary}\n\n`;
    }

    if (cvData.experience.length > 0) {
      markdown += `## Work Experience\n`;
      cvData.experience.forEach(exp => {
        markdown += `### ${exp.title} at ${exp.company}\n`;
        markdown += `${exp.location} | ${exp.startDate} - ${exp.endDate}\n`;
        markdown += `${exp.description}\n\n`;
      });
    }

    if (cvData.education.length > 0) {
      markdown += `## Education\n`;
      cvData.education.forEach(edu => {
        markdown += `### ${edu.degree} from ${edu.school}\n`;
        markdown += `${edu.location} | Graduated: ${edu.graduationDate}\n`;
        if (edu.gpa) markdown += `GPA: ${edu.gpa}\n`;
        markdown += `\n`;
      });
    }

    if (cvData.skills.length > 0) {
      markdown += `## Skills\n`;
      markdown += cvData.skills.map(skill => `${skill.name} (${skill.level})`).join(', ') + '\n\n';
    }

    if (cvData.certifications.length > 0) {
      markdown += `## Certifications\n`;
      cvData.certifications.forEach(cert => {
        markdown += `### ${cert.name}\n`;
        markdown += `${cert.issuingOrganization} | Issued: ${cert.date}\n\n`;
      });
    }

    if (cvData.languages.length > 0) {
      markdown += `## Languages\n`;
      cvData.languages.forEach(lang => {
        markdown += `### ${lang.name}\n`;
        markdown += `Proficiency: ${lang.proficiency}\n\n`;
      });
    }

    if (cvData.personalInfo.additionalInfo) {
      markdown += `## Additional Information\n`;
      markdown += `${cvData.personalInfo.additionalInfo}\n\n`;
    }

    return markdown;
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
                <h4 className="text-lg font-bold text-gray-900 mb-2">Choose Theme</h4>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  aria-label="Select CV Theme"
                >
                  <option value="blue">Modern Blue</option>
                  <option value="earth">Earth Tones</option>
                  <option value="green">Professional Green</option>
                </select>

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
                  onClick={() => {
                    if (!isFormValid) {
                      toast.error('Please complete all required fields before generating Markdown.');
                      return;
                    }
                    setShowMarkdownPreview(true);
                  }}
                  className={`w-full font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    isFormValid 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Award size={16} /> {/* Using Award icon for Markdown for now, can change later */}
                  <span>View Markdown</span>
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
                      Profile Photo (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files && updatePersonal('photo', e.target.files[0])}
                      className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      aria-label="Upload Profile Photo"
                    />
                    {cvData.personalInfo.photo && (
                      <div className="mt-4 flex justify-center">
                        <img src={cvData.personalInfo.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-2 border-blue-200 shadow-md" />
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Social Media (Optional)</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                        <input
                          type="url"
                          value={cvData.personalInfo.socialMedia.linkedin}
                          onChange={(e) => updatePersonal('socialMedia.linkedin', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                        <input
                          type="url"
                          value={cvData.personalInfo.socialMedia.github}
                          onChange={(e) => updatePersonal('socialMedia.github', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://github.com/yourprofile"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Personal Website</label>
                        <input
                          type="url"
                          value={cvData.personalInfo.socialMedia.website}
                          onChange={(e) => updatePersonal('socialMedia.website', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
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
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={cvData.personalInfo.additionalInfo}
                      onChange={(e) => updatePersonal('additionalInfo', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any other relevant information, e.g., references available upon request, interests, volunteer work..."
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
                            aria-label="Remove experience"
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
                              aria-label="Start Date"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              aria-label="End Date"
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
                            aria-label="Remove education"
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
                              aria-label="Graduation Date"
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
                            aria-label="Skill Level"
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
                          aria-label="Remove skill"
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

              {/* Certifications */}
              {activeStep === 4 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addCertification}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Certification</span>
                    </motion.button>
                  </div>
                  
                  <div className="space-y-6">
                    {cvData.certifications.map((cert: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">Certification {index + 1}</h4>
                          <button
                            onClick={() => removeItem('certifications', index)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Remove certification"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                            <input
                              type="text"
                              value={cert.name}
                              onChange={(e) => updateCertification(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="AWS Certified Developer"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                            <input
                              type="text"
                              value={cert.issuingOrganization}
                              onChange={(e) => updateCertification(index, 'issuingOrganization', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Amazon Web Services"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Issue</label>
                            <input
                              type="month"
                              value={cert.date}
                              onChange={(e) => updateCertification(index, 'date', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              aria-label="Date of Issue"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {cvData.certifications.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>No certifications added yet. Click "Add Certification" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Languages */}
              {activeStep === 5 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Languages</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addLanguage}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Language</span>
                    </motion.button>
                  </div>
                  
                  <div className="space-y-6">
                    {cvData.languages.map((lang: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">Language {index + 1}</h4>
                          <button
                            onClick={() => removeItem('languages', index)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Remove language"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                            <input
                              type="text"
                              value={lang.name}
                              onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="English"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency</label>
                            <select
                              value={lang.proficiency}
                              onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              aria-label="Language Proficiency"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Native">Native</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {cvData.languages.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>No languages added yet. Click "Add Language" to get started.</p>
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
              <CVPreview data={cvData} selectedTheme={selectedTheme} />
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

      {/* Markdown Preview Modal */}
      {showMarkdownPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowMarkdownPreview(false)}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMarkdownPreview(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">CV in Markdown Format</h2>
            <div className="bg-gray-100 p-6 rounded-lg font-mono whitespace-pre-wrap text-sm leading-relaxed">
              {generateMarkdownCV()}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateMarkdownCV());
                  toast.success('Markdown copied to clipboard!');
                }}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Copy Markdown
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default CVBuilder;