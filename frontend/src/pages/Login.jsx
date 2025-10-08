import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";
import { toast } from "react-hot-toast";

const Login = () => {
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    login(form, navigate);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A192F]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 container mx-auto px-6">
        {/* Image Section */}
        <div className="w-full max-w-md hidden md:block">
          <img
            src="logo.webp"
            alt="Students studying with technology"
            className="rounded-lg shadow-xl w-full h-auto object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="bg-[#112240] p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-[#CCD6F6] mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-[#8892B0] mb-8">
            Sign in to continue.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#CCD6F6] text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-[#0A192F] border border-[#233554] text-[#CCD6F6] rounded-md py-2 px-3 focus:outline-none focus:border-[#64FFDA]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-[#CCD6F6] text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full bg-[#0A192F] border border-[#233554] text-[#CCD6F6] rounded-md py-2 px-3 focus:outline-none focus:border-[#64FFDA]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#64FFDA] text-[#0A192F] font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all duration-300 mb-4"
            >
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-[#8892B0] mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#64FFDA] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
