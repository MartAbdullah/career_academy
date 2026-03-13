import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub, FaFacebook, FaGraduationCap } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaGraduationCap className="text-3xl text-indigo-400" />
              <span className="text-xl font-bold text-white">Career Academy</span>
            </div>
            <p className="text-gray-400 mb-6">Empowering the next generation of tech professionals with world-class education.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl transition"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition"><FaLinkedin /></a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition"><FaGithub /></a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition"><FaFacebook /></a>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Courses</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Data Science</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Mobile Apps</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">AI & ML</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 Career Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
