import { FileText } from 'lucide-react'; // Import the icon

const CTASection = () => {
  return (
    <div className="bg-blue-600 text-white py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Apply These Tips?</h2>
      <p className="mb-8">Use our CV builder to implement these strategies and create a professional CV in minutes.</p>
      
      <button 
        className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
      >
        <FileText className="w-5 h-5" /> {/* Add the document icon */}
        <span>Start Building Your CV</span>
        <span className="ml-2">→</span>
      </button>
    </div>
  );
};