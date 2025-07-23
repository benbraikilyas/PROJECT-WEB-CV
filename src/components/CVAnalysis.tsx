import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, XCircle, AlertTriangle, FileText, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const CVAnalysis: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [showUserForm, setShowUserForm] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCurrentFile(file);
    setShowUserForm(true);
  };

  const handleUserInfoSubmit = async () => {
    if (!userInfo.name || !userInfo.email || !currentFile) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsAnalyzing(true);
    setShowUserForm(false);
    
    // Simulate analysis
    setTimeout(() => {
      const analysisData = {
        score: 72,
        strengths: [
          'Strong technical skills section',
          'Quantified achievements',
          'Professional email address',
          'Consistent formatting'
        ],
        weaknesses: [
          'Missing keywords for ATS',
          'No professional summary',
          'Outdated contact information',
          'Too many pages (3 pages)'
        ],
        suggestions: [
          'Add a compelling professional summary',
          'Include industry-specific keywords',
          'Reduce to 1-2 pages maximum',
          'Add LinkedIn profile URL',
          'Use action verbs in bullet points'
        ]
      };
      
      // Save to localStorage instead of database
      localStorage.setItem('cvAnalysis', JSON.stringify({
        userInfo,
        analysisData,
        date: new Date().toISOString()
      }));
      
      setAnalysisResult(analysisData);
      setIsAnalyzing(false);
      toast.success('CV analysis complete!');
    }, 3000);
  };

  const handleVerification = async () => {
    setVerificationStep(1);
    // Simulate verification process
    setTimeout(() => {
      setVerificationStep(2);
      setTimeout(() => {
        setIsVerified(true);
        setVerificationStep(0);
        toast.success('CV verified successfully! All checks passed.');
      }, 1500);
    }, 2000);
  };

  const analysisCategories = [
    { name: 'ATS Compatibility', score: 65, color: 'text-yellow-600' },
    { name: 'Content Quality', score: 78, color: 'text-green-600' },
    { name: 'Formatting', score: 85, color: 'text-green-600' },
    { name: 'Keywords', score: 55, color: 'text-red-600' },
    { name: 'Length', score: 70, color: 'text-yellow-600' },
  ];

  return (
    <section id="analysis" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Free CV Analysis
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload your CV and get instant feedback on how to improve it. Our AI-powered analysis 
            checks for ATS compatibility, content quality, and recruiter appeal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="bg-gradient-to-br from-earth-50 to-warm-beige/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Upload Your CV
              </h3>
              
              <div className="border-2 border-dashed border-sage-green rounded-xl p-8 text-center hover:border-medium-green transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="cv-upload"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-forest-green mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Drop your CV here or click to browse
                  </p>
                  <p className="text-gray-600">
                    Supports PDF, DOC, DOCX (Max 5MB)
                  </p>
                </label>
              </div>

              {isAnalyzing && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-forest-green border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-forest-green font-medium">Analyzing your CV...</span>
                  </div>
                </div>
              )}
            </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900">Privacy Protected</h4>
                  <p className="text-green-700 text-sm">
                    Your CV is analyzed securely and stored safely for your future reference. 
                    We never share your personal information with third parties.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        {/* User Information Modal */}
        {showUserForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Information
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                We need some basic information to save your CV analysis results.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowUserForm(false);
                    setCurrentFile(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUserInfoSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Analyze CV
                </button>
              </div>
            </motion.div>
          </div>
        )}

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {analysisResult ? (
              <>
                {/* Overall Score */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-forest-green mb-2">
                      {analysisResult.score}/100
                    </div>
                    <p className="text-gray-600">Overall CV Score</p>
                  </div>
                  
                  {/* Category Scores */}
                  <div className="space-y-4">
                    {analysisCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">{category.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-forest-green h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${category.score}%` }}
                            ></div>
                          </div>
                          <span className={`font-semibold ${category.color}`}>
                            {category.score}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-bold text-green-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.strengths.map((strength: string, index: number) => (
                      <li key={index} className="text-green-700 flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h4 className="font-bold text-red-900 mb-4 flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="text-red-700 flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="font-bold text-yellow-900 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-yellow-700 flex items-start">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Download Report */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                 onClick={() => {
                   // Create a detailed report
                   const reportData = {
                     analysisDate: new Date().toLocaleDateString(),
                     overallScore: analysisResult.score,
                     categoryScores: analysisCategories,
                     strengths: analysisResult.strengths,
                     weaknesses: analysisResult.weaknesses,
                     recommendations: analysisResult.suggestions
                   };
                   
                   // Create downloadable content
                   const reportContent = `
CV ANALYSIS REPORT
==================
Analysis Date: ${reportData.analysisDate}
Overall Score: ${reportData.overallScore}/100

CATEGORY BREAKDOWN:
${reportData.categoryScores.map(cat => `${cat.name}: ${cat.score}%`).join('\n')}

STRENGTHS:
${reportData.strengths.map((item, i) => `${i + 1}. ${item}`).join('\n')}

AREAS FOR IMPROVEMENT:
${reportData.weaknesses.map((item, i) => `${i + 1}. ${item}`).join('\n')}

RECOMMENDATIONS:
${reportData.recommendations.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Generated by CV Pro - Professional CV Improvement Platform
                   `;
                   
                   // Create and download file
                   const blob = new Blob([reportContent], { type: 'text/plain' });
                   const url = window.URL.createObjectURL(blob);
                   const link = document.createElement('a');
                   link.href = url;
                   link.download = `CV_Analysis_Report_${new Date().toISOString().split('T')[0]}.txt`;
                   document.body.appendChild(link);
                   link.click();
                   document.body.removeChild(link);
                   window.URL.revokeObjectURL(url);
                   
                   toast.success('Report downloaded successfully!');
                 }}
                  className="w-full bg-forest-green hover:bg-deep-forest text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Detailed Report</span>
                </motion.button>

                {/* Verification Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerification}
                  disabled={verificationStep > 0}
                  className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isVerified 
                      ? 'bg-medium-green hover:bg-forest-green text-white' 
                      : verificationStep > 0
                      ? 'bg-sage-green text-white cursor-not-allowed'
                      : 'bg-deep-forest hover:bg-forest-green text-white'
                  }`}
                >
                  {verificationStep === 1 && (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying CV...</span>
                    </>
                  )}
                  {verificationStep === 2 && (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Final Checks...</span>
                    </>
                  )}
                  {verificationStep === 0 && !isVerified && (
                    <>
                      <CheckCircle size={20} />
                      <span>Verify CV Quality</span>
                    </>
                  )}
                  {isVerified && (
                    <>
                      <CheckCircle size={20} />
                      <span>✓ CV Verified</span>
                    </>
                  )}
                </motion.button>
              </>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-gray-600">
                  Upload your CV to see detailed analysis and improvement suggestions.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CVAnalysis;