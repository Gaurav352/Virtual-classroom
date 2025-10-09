import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";

const Register = () => {
  const { signup, isSigningUp } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ fullName:name, email, password });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A192F]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 container mx-auto px-6">
        {/* Image Section */}
        <div className="w-full max-w-md hidden md:block">
          <img
            src="logo.webp"
            alt="Group of students collaborating"
            className="rounded-lg shadow-xl w-full h-auto object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="bg-[#112240] p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-[#CCD6F6] mb-2">
            Create an Account
          </h2>
          <p className="text-center text-[#8892B0] mb-8">
            Get started with AudioLize today.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="register-name"
                className="block text-[#CCD6F6] text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                id="register-name"
                type="text"
                placeholder="Gaurav"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A192F] border border-[#233554] text-[#CCD6F6] rounded-md py-2 px-3 focus:outline-none focus:border-[#64FFDA]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="register-email"
                className="block text-[#CCD6F6] text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A192F] border border-[#233554] text-[#CCD6F6] rounded-md py-2 px-3 focus:outline-none focus:border-[#64FFDA]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="register-password"
                className="block text-[#CCD6F6] text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                id="register-password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A192F] border border-[#233554] text-[#CCD6F6] rounded-md py-2 px-3 focus:outline-none focus:border-[#64FFDA]"
              />
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-[#64FFDA] text-[#0A192F] font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all duration-300 mb-4"
            >
              {isSigningUp ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-[#8892B0] mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#64FFDA] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
