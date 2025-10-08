import React from "react";


const CheckCircleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const Benefits = () => {
    const benefitsList = [
        'Learn while commuting or doing other tasks',
        'Better retention through audio learning',
        'Instant clarification of complex topics',
        'Accessible learning for all students',
        'Save time with AI-powered summaries'
    ];

    return (
        <section id="benefits" className="py-20 bg-[#0A192F]">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#CCD6F6]">
                            Why Students Love AudioLize
                        </h2>
                        <div className="space-y-4">
                            {benefitsList.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0 mt-0.5 text-[#64FFDA]" />
                                    <span className="text-[#8892B0] text-lg">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-lg p-8 shadow-xl bg-[#112240]">
                        <div className="text-white space-y-6 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-[#CCD6F6]">Already trusted by many students</h3>
                            <p className="text-lg opacity-90 text-[#8892B0]">
                                Students worldwide are already learning smarter with AudioLize. Start your journey today.
                            </p>
                            <button className="px-8 py-3 bg-[#64FFDA] text-[#0A192F] rounded-md font-semibold text-lg transition transform hover:scale-105">
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};