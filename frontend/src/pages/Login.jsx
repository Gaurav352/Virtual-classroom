import React from "react";
import { Link } from "react-router-dom";

const Login = () => {

  return (
    <section id="login" className="min-h-screen flex items-center justify-center bg-[#0A192F]">
  <div className="flex flex-col md:flex-row items-center justify-center gap-12 container mx-auto px-6">
    <div className="bg-[#112240] p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-[#CCD6F6] mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-[#8892B0] mb-8">
        Sign in to continue to AudioLize.
      </p>

      <form>
        <div className="mb-4">
          <label className="block text-[#CCD6F6] text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full bg-[#0A192F] border border-[#233554] text-[#CCD6F6] rounded-md py-2 px-3 focus:outline-none focus:border-[#64FFDA]"
            id="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#CCD6F6] text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full bg-[#0A192F] border border-[#233554] text-[#CCD6F6] rounded-md py-2 px-3 focus:outline-none focus:border-[#64FFDA]"
            id="password"
            type="password"
            placeholder="********"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <button
            className="w-full bg-[#64FFDA] text-[#0A192F] font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all duration-300"
            type="button"
          >
            Sign In
          </button>
        </div>

        <div className="text-center">
          <a className="inline-block align-baseline font-bold text-sm text-[#64FFDA] hover:underline" href="#">
            Forgot Password?
          </a>
        </div>
      </form>

      <p className="text-center text-sm text-[#8892B0] mt-8">
        Don't have an account?{" "}
        <Link to={"/register"} className="font-bold text-[#64FFDA] hover:underline">
          Sign Up
        </Link>
      </p>
    </div>

    <div className="w-full max-w-md hidden md:block">
      <img
        src="logo.webp"
        alt="Students studying with technology"
        className="rounded-lg shadow-xl w-full h-auto object-cover"
      />
    </div>
  </div>
</section>

  );
};
export default Login;