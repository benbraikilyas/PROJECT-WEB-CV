import React, { useState, useEffect } from 'react';
import { Eye, Download, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import CVPreview from './CVPreview'; // We'll create this component

const CVBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [cvData, setCvData] = useState({
    personalInfo: {},
    experience: [],
    education: [],
    skills: []
  });
  const [canProceed, setCanProceed] = useState(false);

  // Validate if current section is complete
  useEffect(() => {
    const validateSection = () => {
      switch (currentStep) {
        case 0: // Personal Info
          return Object.keys(cvData.personalInfo).length > 0;
        case 1: // Experience
          return cvData.experience.length > 0;
        case 2: // Education
          return cvData.education.length > 0;
        case 3: // Skills
          return cvData.skills.length > 0;
        default:
          return false;
      }
    };
    setCanProceed(validateSection());
  }, [cvData, currentStep]);

  // Handle Preview button click
  const handlePreview = () => {
    if (!cvData.personalInfo || Object.keys(cvData.personalInfo).length === 0) {
      toast.error('Please fill in your information first');
      return;
    }
    setShowPreview(true);
  };

  // Handle Save & Download
  const handleDownload = async () => {
    if (!cvData.personalInfo || Object.keys(cvData.personalInfo).length === 0) {
      toast.error('Please fill in your information first');
      return;
    }
    
    try {
      // Generate PDF using html2pdf or similar library
      const pdf = await generatePDF(cvData);
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cvData.personalInfo.fullName || 'my'}_cv.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('CV downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download CV');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          className={`px-6 py-2 rounded-lg ${
            currentStep === 0 
              ? 'bg-gray-200 cursor-not-allowed' 
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}
          disabled={currentStep === 0}
        >
          Previous
        </button>

        <div className="flex space-x-4">
          <button
            onClick={handlePreview}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={!Object.keys(cvData.personalInfo).length}
          >
            <Download className="w-4 h-4" />
            <span>Save & Download CV</span>
          </button>

          <button
            onClick={handleNext}
            className={`px-6 py-2 rounded-lg ${
              !canProceed
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={!canProceed}
          >
            {currentStep === 3 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>

      {/* Success message when CV is complete */}
      {Object.keys(cvData.personalInfo).length > 0 && 
       cvData.experience.length > 0 && 
       cvData.education.length > 0 && 
       cvData.skills.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>CV is ready to generate!</span>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">CV Preview</h2>
            <CVPreview data={cvData} />
            
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVBuilder;