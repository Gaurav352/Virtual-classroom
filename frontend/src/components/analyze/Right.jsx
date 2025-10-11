// src/components/analyze/Right.jsx
import React from "react";

const Right = ({ Button }) => {
  return (
    <div className="w-full lg:w-1/4 xl:w-1/5 bg-[#2d3748] p-6 rounded-xl flex flex-col shadow-lg">
      <h2 className="text-lg font-bold text-white mb-4">Document Chatbot</h2>

      <div className="flex-grow bg-[#1a202c] p-4 rounded-lg text-center text-gray-400 text-sm flex items-center justify-center mb-4">
        No conversation yet. Ask something!
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your question..."
          className="flex-grow bg-[#1a202c] border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C49A]"
        />
        <Button onClick={() => {}} className="px-5 py-3 text-sm">
          Send
        </Button>
      </div>

      <div className="text-xs text-gray-400 mt-4">
        <p className="font-bold">Notes:</p>
        <p>
          Audio playback uses a blob returned by the backend. If your backend provides a transcript, we display it.
        </p>
      </div>
    </div>
  );
};

export default Right;
