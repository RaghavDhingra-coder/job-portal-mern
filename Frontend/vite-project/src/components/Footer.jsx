import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <h1 className="text-xl font-bold">
          <span className="text-blue-600">Talent</span>
          <span className="text-gray-900">Bridge</span>
        </h1>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <a className="hover:text-blue-600 cursor-pointer">About</a>
          <a className="hover:text-blue-600 cursor-pointer">Contact</a>
          <a className="hover:text-blue-600 cursor-pointer">Privacy</a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} TalentBridge. All rights reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;