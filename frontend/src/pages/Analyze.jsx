import React, { useState, useRef } from 'react';
import Left from '../components/analyze/Left';
import Middle from '../components/analyze/Middle';
import Right from '../components/analyze/Right';

// --- Helper Components for better structure ---

// SVG Icon Component for better reusability
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

// Reusable Button Component
const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = 'px-6 py-3 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-[#00C49A] text-white hover:bg-teal-600 focus:ring-teal-400',
    secondary: 'bg-transparent border border-[#00C49A] text-[#00C49A] hover:bg-[#00C49A] hover:text-white',
    ghost: 'bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white',
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('pdf'); // 'summary' or 'pdf'
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName('');
     
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPdfUrl(url);
      setActiveTab('pdf'); // Switch to PDF view on upload
    }
  };

  

  return (
    <div className="bg-[#1a202c] min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Virtual Classroom — <span className="text-gray-400">Document Viewer</span>
        </h1>
      </header>
      <main className="flex flex-col lg:flex-row gap-8 w-full max-w-screen-2xl mx-auto">
        <Left />
        <Middle />
        <Right />
      </main>
    </div>
  );
}

