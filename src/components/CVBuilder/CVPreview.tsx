import React from 'react';

interface CVPreviewProps {
  data: {
    personalInfo: any;
    experience: any[];
    education: any[];
    skills: any[];
  };
}

const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  return (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      {/* Personal Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-gray-600">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{exp.title}</h3>
            <p className="text-gray-600">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.duration}</p>
            <p className="mt-2">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{edu.degree}</h3>
            <p className="text-gray-600">{edu.school}</p>
            <p className="text-sm text-gray-500">{edu.duration}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill.name} - {skill.level}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CVPreview;