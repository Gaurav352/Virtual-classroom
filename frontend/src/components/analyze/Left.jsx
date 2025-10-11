import React from "react";
import { UploadIcon } from "lucide-react";

// Reuse the Icon and Button components from App
// (If they’re not exported, define them here again)
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseStyles =
    "px-6 py-3 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-[#00C49A] text-white hover:bg-teal-600 focus:ring-teal-400",
    secondary: "bg-transparent border border-[#00C49A] text-[#00C49A] hover:bg-[#00C49A] hover:text-white",
    ghost: "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// ✅ Left Component — receives props from App.jsx
const Left = ({ fileInputRef, handleFileChange, handleUpload, fileName }) => {
  return (
    <div className="w-full lg:w-1/4 xl:w-1/5 bg-[#2d3748] p-6 rounded-xl flex flex-col gap-8 shadow-lg">
      {/* Upload Section */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Upload PDF</h2>

        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center text-gray-400 mb-4 cursor-pointer hover:border-white hover:text-white"
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf"
          />
          <p className="text-sm">{fileName || "No file chosen"}</p>
        </div>

        <Button onClick={handleUpload} className="w-full">
          <UploadIcon className="w-5 h-5" />
          Upload
        </Button>
      </div>

      {/* Documents Section */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Documents</h2>
        <div className="bg-[#1a202c] p-4 rounded-lg text-center text-gray-400 text-sm">
          No documents yet
        </div>
      </div>

      {/* Explain Button */}
      <div>
        <Button variant="secondary" className="w-full">
          <Icon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          Explain Document (MP3)
        </Button>
      </div>
    </div>
  );
};

export default Left;
