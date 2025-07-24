import React from 'react';

interface CVPreviewProps {
  data: {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      address: string;
      summary: string;
      photo: string;
      socialMedia: {
        linkedin: string;
        github: string;
        website: string;
      };
      additionalInfo: string;
    };
    experience: any[];
    education: any[];
    skills: any[];
    certifications: any[];
    languages: any[];
  };
  selectedTheme: string; // New prop for theme selection
}

const CVPreview: React.FC<CVPreviewProps> = ({ data, selectedTheme }) => {
  const { personalInfo, experience, education, skills, certifications, languages } = data;

  const themeColors: { [key: string]: { primary: string; accent: string; text: string; lightBg: string; border: string; social: string; } } = {
    blue: {
      primary: 'text-blue-700', 
      accent: 'border-blue-400',
      text: 'text-gray-800',
      lightBg: 'bg-blue-100',
      border: 'border-gray-200',
      social: 'text-blue-700'
    },
    earth: {
      primary: 'text-forest-green', 
      accent: 'border-warm-beige',
      text: 'text-gray-800',
      lightBg: 'bg-earth-100',
      border: 'border-earth-200',
      social: 'text-forest-green'
    },
    green: {
      primary: 'text-cv-green-DEFAULT', 
      accent: 'border-cv-teal-DEFAULT',
      text: 'text-gray-800',
      lightBg: 'bg-cv-teal-light',
      border: 'border-gray-200',
      social: 'text-cv-green-DEFAULT'
    },
  };

  const currentTheme = themeColors[selectedTheme] || themeColors.blue; // Default to blue if theme not found

  return (
    <div className={`bg-white p-8 shadow-lg rounded-lg font-sans ${currentTheme.text} leading-relaxed`}>
      {/* Personal Info */}
      <div className={`mb-8 pb-4 border-b ${currentTheme.border} flex items-center`}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" className={`w-28 h-28 rounded-full object-cover mr-6 border-2 ${currentTheme.accent} shadow-sm`} />
        )}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
          <div className="text-lg text-gray-600 mb-2">
            <p>{personalInfo.email} | {personalInfo.phone} | {personalInfo.address}</p>
          </div>
          <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-2 ${currentTheme.social} font-medium text-sm`}>
              {personalInfo.socialMedia.linkedin && (
                <a href={personalInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
              )}
              {personalInfo.socialMedia.github && (
                <a href={personalInfo.socialMedia.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
              )}
              {personalInfo.socialMedia.website && (
                <a href={personalInfo.socialMedia.website} target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a>
              )}
            </div>
        </div>
      </div>

      {personalInfo.summary && (
        <div className={`mb-8 pb-4 border-b ${currentTheme.border}`}>
          <h2 className={`text-2xl font-bold ${currentTheme.primary} mb-3`}>Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className={`mb-8 pb-4 border-b ${currentTheme.border}`}>
        <h2 className={`text-2xl font-bold ${currentTheme.primary} mb-4`}>Work Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="mb-5 last:mb-0">
            <h3 className="font-bold text-xl text-gray-900">{exp.title} at {exp.company}</h3>
            <p className="text-gray-600 text-sm mb-1">{exp.location} | {exp.startDate} - {exp.endDate}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {exp.description.split('\n').map((line: string, i: number) => (
                line.trim() && <li key={i}>{line.trim()}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className={`mb-8 pb-4 border-b ${currentTheme.border}`}>
        <h2 className={`text-2xl font-bold ${currentTheme.primary} mb-4`}>Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-5 last:mb-0">
            <h3 className="font-bold text-xl text-gray-900">{edu.degree} from {edu.school}</h3>
            <p className="text-gray-600 text-sm">{edu.location} | Graduated: {edu.graduationDate}</p>
            {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className={`mb-8 pb-4 border-b ${currentTheme.border}`}>
        <h2 className={`text-2xl font-bold ${currentTheme.primary} mb-4`}>Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className={`px-4 py-1 ${currentTheme.lightBg} ${currentTheme.primary} rounded-full text-sm font-medium`}
            >
              {skill.name} ({skill.level})
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className={`mb-8 pb-4 border-b ${currentTheme.border}`}>
          <h2 className={`text-2xl font-bold ${currentTheme.primary} mb-4`}>Certifications</h2>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg text-gray-900">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.issuingOrganization} | Issued: {cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className={`mb-8 pb-4 border-b ${currentTheme.border}`}>
          <h2 className={`text-2xl font-bold ${currentTheme.primary} mb-4`}>Languages</h2>
          <div className="space-y-3">
            {languages.map((lang, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg text-gray-900">{lang.name}</h3>
                <p className="text-gray-600 text-sm">Proficiency: {lang.proficiency}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      {personalInfo.additionalInfo && (
        <div className="pb-4">
          <h2 className={`text-2xl font-bold ${currentTheme.primary} mb-4`}>Additional Information</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{personalInfo.additionalInfo}</p>
        </div>
      )}
    </div>
  );
};

export default CVPreview;