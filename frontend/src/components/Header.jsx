import React from "react";
import { useAuthStore } from "../zustand/authStore";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const {authUser} = useAuthStore();
    const navigate = useNavigate();
    return (

  <header className="bg-[#0A192F] text-[#CCD6F6] sticky top-0 z-50 shadow-md">
    <div className="container mx-auto flex justify-between items-center p-4">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#64FFDA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-5.22-8.242l10.44 5.484-10.44-5.484zM12 21.747L6.78 16.263 12 21.747zm0 0l5.22-5.484L12 21.747zM12 2.253L6.78 7.737 12 2.253zm0 0l5.22 5.484L12 2.253z" />
        </svg>
        <h1 className="text-2xl font-bold">AudioLize</h1>
      </div>
      <nav className="hidden md:flex space-x-6 items-center">
        <a href="#benefits" className="hover:text-[#64FFDA] transition-colors duration-300">Benefits</a>
        <a href="#how-it-works" className="hover:text-[#64FFDA] transition-colors duration-300">How It Works</a>
        <a href="#contact" className="hover:text-[#64FFDA] transition-colors duration-300">Contact</a>
      </nav>
      <div className="hidden md:flex items-center gap-3">
  <button
    onClick={() => (authUser ? navigate("/analyze") : navigate("/login"))}
    className="bg-transparent text-[#64FFDA] border border-[#64FFDA] rounded-md px-4 py-2 hover:bg-[#64FFDA] hover:text-[#0A192F] transition-all duration-300"
  >
    Get Started
  </button>

  {!authUser && (
    <button
      
      className="bg-transparent text-[#64FFDA] border border-[#64FFDA] rounded-md px-4 py-2 hover:bg-[#64FFDA] hover:text-[#0A192F] transition-all duration-300"
    >
      Logout
    </button>
  )}
</div>

    
      <button className="md:hidden text-[#CCD6F6]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </header>
)};
