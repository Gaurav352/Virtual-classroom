import React from "react";

export const Footer = () => (
  <footer id="contact" className="bg-[#0A192F] text-[#8892B0] border-t border-[#112240]">
    <div className="container mx-auto py-8 px-6 text-center">
      <p>&copy; {new Date().getFullYear()} AudioLize. All rights reserved.</p>
       <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="hover:text-[#64FFDA] transition-colors">Twitter</a>
        <a href="#" className="hover:text-[#64FFDA] transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-[#64FFDA] transition-colors">GitHub</a>
      </div>
    </div>
  </footer>
);
