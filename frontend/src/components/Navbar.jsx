import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <FaGraduationCap className="text-3xl text-indigo-600" />
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">Career Academy</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-semibold transition">Home</Link>
            <Link to="/courses" className="text-gray-700 hover:text-indigo-600 font-semibold transition">Courses</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-semibold transition">About</Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <div className="text-gray-700 font-semibold">
                  {user.full_name || user.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 transition"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
            <Link to="/courses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Courses</Link>
            <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
            {isAuthenticated && user ? (
              <>
                <div className="block px-4 py-2 text-gray-700 font-semibold">
                  {user.full_name || user.email}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-indigo-600 hover:bg-gray-100">Sign In</Link>
                <Link to="/register" className="block px-4 py-2 text-indigo-600 hover:bg-gray-100">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
