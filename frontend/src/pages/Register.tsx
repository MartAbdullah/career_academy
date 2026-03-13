import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGraduationCap, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // API call would go here
      // For now, just redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:border-white/40 transition duration-300">
          {/* Header */}
          <div className="px-8 py-16 text-center relative">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-indigo-400 to-purple-500 p-4 rounded-full">
                <FaGraduationCap className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Career Academy</h1>
            <p className="text-indigo-200 text-lg">Join Our Community</p>
          </div>

          {/* Form container */}
          <div className="px-8 pb-10">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-xl mb-6 text-sm backdrop-blur-sm">
                <p className="font-semibold">✗ {error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div className="group">
                <label className="block text-white font-semibold mb-2 text-sm">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-4 text-indigo-400 text-lg" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder:text-white/40 text-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="group">
                <label className="block text-white font-semibold mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-4 text-indigo-400 text-lg" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder:text-white/40 text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="group">
                <label className="block text-white font-semibold mb-2 text-sm">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-4 text-indigo-400 text-lg" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder:text-white/40 text-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-indigo-400 hover:text-indigo-300 transition"
                  >
                    {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                  </button>
                </div>
              </div>

              {/* Confirm password field */}
              <div className="group">
                <label className="block text-white font-semibold mb-2 text-sm">Confirm Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-4 text-indigo-400 text-lg" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder:text-white/40 text-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-4 text-indigo-400 hover:text-indigo-300 transition"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                  </button>
                </div>
              </div>

              {/* Privacy agreement */}
              <label className="flex items-start text-sm cursor-pointer">
                <input type="checkbox" className="mr-2 mt-1 w-4 h-4 rounded bg-white/10 border border-white/20 accent-indigo-400 cursor-pointer" />
                <span className="text-white/70 hover:text-white transition">
                  I agree to the <a href="#" className="text-indigo-300 hover:text-indigo-200 font-semibold">Terms & Conditions</a>
                </span>
              </label>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Already have account */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-3 text-white/50 text-sm">Already member?</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Login link */}
            <Link
              to="/login"
              className="w-full block text-center bg-white/10 border border-white/20 text-white font-semibold py-3 rounded-xl hover:bg-white/20 hover:border-white/40 transition duration-200 backdrop-blur-sm"
            >
              Sign In Instead
            </Link>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-white/50 text-xs mt-8">© 2026 Career Academy. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Register;
