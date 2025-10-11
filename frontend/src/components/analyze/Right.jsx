// src/components/analyze/Right.jsx
import React, { useState } from "react";

const Right = ({ documents, selectedDocument, setSelectedDocument, Button, askQuestion, isLoading }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSendQuestion = async () => {
    if (!question.trim() || !selectedDocument) return;
    
    try {
      const result = await askQuestion(question.trim());
      setAnswer(result);
      setQuestion(""); // Clear input after sending
    } catch (error) {
      console.error("Error asking question:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  return (
    <div className="w-full lg:w-1/4 xl:w-1/5 bg-[#2d3748] p-4 rounded-xl flex flex-col shadow-lg h-fit max-h-[90vh]">
      <h2 className="text-lg font-bold text-white mb-4">Document Chatbot</h2>

      {/* Selected Document Info */}
      <div className="bg-[#1a202c] p-3 rounded-lg text-center text-gray-400 text-sm mb-4 min-h-[80px] flex items-center justify-center">
        {selectedDocument ? (
          <div>
            <p className="font-medium text-white mb-1">Selected Document:</p>
            <p className="text-xs break-words">{selectedDocument.originalFilename}</p>
          </div>
        ) : (
          "Select a document to start chatting!"
        )}
      </div>

      {/* Chat Messages Area */}
      {answer && (
        <div className="bg-[#1a202c] p-3 rounded-lg mb-4 max-h-48 overflow-y-auto">
          <div className="text-white text-sm">
            <p className="font-medium text-[#00C49A] mb-2">Answer:</p>
            <p className="whitespace-pre-wrap break-words">{answer}</p>
          </div>
        </div>
      )}

      {/* Input and Button Area */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 min-w-0 bg-[#1a202c] border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C49A] text-sm"
          disabled={!selectedDocument || isLoading}
        />
        <Button 
          onClick={handleSendQuestion} 
          className="px-4 py-2 text-sm whitespace-nowrap flex-shrink-0"
          disabled={!selectedDocument || isLoading || !question.trim()}
        >
          {isLoading ? "..." : "Send"}
        </Button>
      </div>

      {/* Notes */}
      <div className="text-xs text-gray-400 mt-auto">
        <p className="font-bold">Notes:</p>
        <p>
          Ask questions about your document and get AI-powered answers. Press Enter to send quickly.
        </p>
      </div>
    </div>
  );
};

export default Right;
