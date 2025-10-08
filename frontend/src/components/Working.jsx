import React from "react";

export const Working = () => (
  <section id="how-it-works" className="py-20 bg-[#0A192F]">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-[#CCD6F6]">How It Works</h3>
        <p className="text-[#8892B0] mt-2">A simple three-step process to unlock your document's potential.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Step 1 */}
        <div className="bg-[#112240] p-8 rounded-lg shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#0A192F] text-[#64FFDA] mx-auto mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          </div>
          <h4 className="text-xl font-semibold text-[#CCD6F6] mb-2">1. Upload PDF</h4>
          <p className="text-[#8892B0]">Securely upload your document. We support various PDF formats and sizes.</p>
        </div>
        {/* Step 2 */}
        <div className="bg-[#112240] p-8 rounded-lg shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#0A192F] text-[#64FFDA] mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728m2.828 9.9a5 5 0 010-7.072" /></svg>
          </div>
          <h4 className="text-xl font-semibold text-[#CCD6F6] mb-2">2. Listen & Learn</h4>
          <p className="text-[#8892B0]">Our AI generates a high-quality voiceover. Play, pause, and navigate with ease.</p>
        </div>
        {/* Step 3 */}
        <div className="bg-[#112240] p-8 rounded-lg shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#0A192F] text-[#64FFDA] mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h4 className="text-xl font-semibold text-[#CCD6F6] mb-2">3. Ask Questions</h4>
          <p className="text-[#8892B0]">Interact with our AI to get instant answers and summaries based on your document.</p>
        </div>
      </div>
    </div>
  </section>
);