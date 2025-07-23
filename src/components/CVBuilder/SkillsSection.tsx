import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Skill {
  name: string;
  level: string;
}

interface SkillsSectionProps {
  onComplete: (isComplete: boolean) => void;
  onSkillsChange: (skills: Skill[]) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ onComplete, onSkillsChange }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  
  // Validate if we have at least one skill
  useEffect(() => {
    const isValid = skills.length > 0;
    onComplete(isValid);
    onSkillsChange(skills);
  }, [skills, onComplete, onSkillsChange]);

  const addSkill = () => {
    setSkills([...skills, { name: '', level: 'Intermediate' }]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Skills</h2>
        <button
          onClick={addSkill}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {skills.map((skill, index) => (
        <div key={index} className="flex gap-4 items-center">
          <input
            type="text"
            value={skill.name}
            onChange={(e) => {
              const newSkills = [...skills];
              newSkills[index].name = e.target.value;
              setSkills(newSkills);
            }}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Enter skill (e.g., JavaScript, Python)"
          />
          <select
            value={skill.level}
            onChange={(e) => {
              const newSkills = [...skills];
              newSkills[index].level = e.target.value;
              setSkills(newSkills);
            }}
            className="p-2 border rounded-lg"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
          <button
            onClick={() => removeSkill(index)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};