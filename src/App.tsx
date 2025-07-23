import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CVAnalysis from './components/CVAnalysis';
import CVTemplate from './components/CVTemplate';
import CVTips from './components/CVTips';
import ATSOptimization from './components/ATSOptimization';
import IndustryGuides from './components/IndustryGuides';
import CVBuilder from './components/CVBuilder';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  // Simple admin check - in production, use proper authentication
  const isAdmin = window.location.pathname === '/admin';

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminDashboard />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            className: 'font-sans',
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Toaster position="bottom-right" />
      <Navigation />
      <Hero />
      <CVAnalysis />
      <CVTemplate />
      <CVTips />
      <ATSOptimization />
      <IndustryGuides />
      <CVBuilder />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;