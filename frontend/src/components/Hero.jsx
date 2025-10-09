import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";
 

export const Hero = () => {
    const navigate = useNavigate();
    const {authUser}=useAuthStore();
    console.log("H1",authUser);
    return (
  <section id="features" className="bg-[#0A192F] text-[#CCD6F6]">
    <div className="container mx-auto px-6 py-20 md:py-32 text-center">
      <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
        Transform Your PDFs into Interactive <span className="text-[#64FFDA]">Audio Experiences</span>.
      </h2>
      <p className="text-lg md:text-xl text-[#8892B0] max-w-3xl mx-auto mb-8">
        Upload your documents, listen to a crystal-clear voiceover, and ask questions to deepen your understanding. Learning has never been this accessible.
      </p>
      <div className="flex justify-center space-x-4">
        <button
            onClick={()=>(authUser ?navigate("/analyze"):navigate("/login"))}
        className="bg-[#64FFDA] text-[#0A192F] font-semibold py-3 px-8 rounded-md hover:bg-opacity-80 transition-all duration-300 shadow-lg shadow-[#64ffda]/20">
          Get Started
        </button>
        <a href="#how-it-works" className="bg-[#112240] text-[#CCD6F6] font-semibold py-3 px-8 rounded-md hover:bg-opacity-80 transition-all duration-300">
          Learn More
        </a>
      </div>
    </div>
  </section>
)};
