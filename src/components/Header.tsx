import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-4">
          <i className="fi fi-ss-person-cv text-2xl text-blue-600"></i>
          <span className="text-xl font-semibold">CV Pro</span>
        </div>
      </div>
    </header>
  );
};

export default Header;