// src/components/analyze/Middle.jsx
import React from "react";

// Accept props from Analyze.jsx
const Middle = ({ pdfUrl, activeTab, setActiveTab, Button, Icon }) => {
  return (
    <div className="flex-1 bg-[#2d3748] p-6 rounded-xl flex flex-col shadow-lg min-h-[70vh]">
      {/* Tabs */}
      <div className="flex border-b border-gray-600 mb-4">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "summary"
              ? "text-white border-b-2 border-[#00C49A]"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("summary")}
        >
          Summary
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "pdf"
              ? "text-white border-b-2 border-[#00C49A]"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("pdf")}
        >
          Full PDF Document
        </button>
      </div>

      {/* PDF / Summary Preview */}
      <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-4 w-full">
        {activeTab === "pdf" ? (
          pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="PDF Preview"
            />
          ) : (
            <div className="text-center text-gray-400">
              <Icon
                path="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-white">PDF Preview</h3>
              <p>Your selected document will appear here.</p>
            </div>
          )
        ) : (
          <div className="text-center text-gray-400">
            <Icon
              path="M4 6h16v2H4zm0 4h16v2H4zm0 4h12v2H4z"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-white">Document Summary</h3>
            <p>The AI-generated summary will appear here.</p>
          </div>
        )}
      </div>

      {/* Audio / Transcript Controls */}
      <div className="flex items-center justify-center gap-6 mt-4 text-gray-400">
        <span className="text-xs">Transcript not available from backend.</span>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Icon path="M8 5v14l11-7z" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Icon path="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </button>
          <Button variant="ghost" className="py-2 px-4 text-xs">
            Copy audio URL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Middle;
