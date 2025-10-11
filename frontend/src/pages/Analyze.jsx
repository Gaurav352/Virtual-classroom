// src/pages/Analyze.jsx
import React, { useState, useRef, useEffect } from "react";
import Left from "../components/analyze/Left";
import Middle from "../components/analyze/Middle";
import Right from "../components/analyze/Right";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../zustand/authStore";
import toast from "react-hot-toast";
// --- Helper Components ---

export const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

export const Button = ({ children, onClick, variant = "primary", className = "" }) => {
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

// --- Main Analyze Page ---
const Analyze = () => {
  const { authUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState("pdf"); // 'pdf' or 'summary'
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch user documents on component mount
  useEffect(() => {
    if (authUser?.username) {
      fetchDocuments();
    }
  }, [authUser]);

  // API Functions
  const fetchDocuments = async () => {
    if (!authUser?.username) return;
    
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/document/documents/${authUser.username}`);
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to fetch documents");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDocument = async () => {
    if (!selectedFile || !authUser?.fullName) {
      toast.error("Please select a PDF file and ensure you're logged in");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("pdf", selectedFile);
      formData.append("username", authUser.username);

      const response = await axiosInstance.post("/document/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Document uploaded successfully!");
      setSelectedDocument(response.data.document);
      
      // Refresh documents list
      await fetchDocuments();
      
      // Create local URL for preview
      const url = URL.createObjectURL(selectedFile);
      setPdfUrl(url);
      setActiveTab("pdf");
      
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  const askQuestion = async (questionText) => {
    const currentQuestion = questionText || question.trim();
    const currentDocument = selectedDocument;
    
    if (!currentQuestion || !currentDocument?._id) {
      toast.error("Please enter a question and select a document");
      return null;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/document/ask", {
        question: currentQuestion,
        documentId: currentDocument._id,
      });

      const answer = response.data.answer;
      
      // Update the main page state if called from Middle component
      if (!questionText) {
        setAnswer(answer);
        toast.success("Question answered!");
      }
      
      return answer;
    } catch (error) {
      console.error("Error asking question:", error);
      toast.error("Failed to get answer");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const explainDocument = async (topic) => {
    if (!topic.trim() || !selectedDocument?._id) {
      toast.error("Please provide a topic and select a document");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/document/explain", {
        topic: topic.trim(),
        documentId: selectedDocument._id,
      });

      setExplanation(response.data.explanation);
      setAudioUrl(response.data.audioUrl);
      toast.success("Explanation generated!");
    } catch (error) {
      console.error("Error generating explanation:", error);
      toast.error("Failed to generate explanation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName("");
      toast.error("Please select a valid PDF file");
    }
  };

  const handleUpload = () => {
    uploadDocument();
  };

  return (
    <div className="bg-[#1a202c] min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Virtual Classroom — <span className="text-gray-400">Document Viewer</span>
        </h1>
      </header>

      <main className="flex flex-col lg:flex-row gap-8 w-full max-w-screen-2xl mx-auto">
        {/* Left Panel */}
        <Left
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          fileName={fileName}
          documents={documents}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          isLoading={isLoading}
          isUploading={isUploading}
          explainDocument={explainDocument}
          Button={Button}
          Icon={Icon}
        />

        {/* Middle Panel */}
        <Middle
          pdfUrl={pdfUrl}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          explanation={explanation}
          audioUrl={audioUrl}
          askQuestion={askQuestion}
          explainDocument={explainDocument}
          isLoading={isLoading}
          Button={Button}
          Icon={Icon}
        />

        {/* Right Panel */}
        <Right 
          documents={documents}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          Button={Button}
          askQuestion={askQuestion}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default Analyze;
