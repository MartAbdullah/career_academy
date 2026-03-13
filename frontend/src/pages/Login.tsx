import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaGraduationCap } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

interface LoginPageProps {
  onLogin?: (email: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Load saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberMe_email');
    const savedPassword = localStorage.getItem('rememberMe_password');
    const wasRemembered = localStorage.getItem('rememberMe_checked');

    if (savedEmail && savedPassword && wasRemembered === 'true') {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (password.length < 1) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      console.log('Login: Attempting login with email:', email);
      // Call backend API
      const result = await login({ email, password });
      console.log('Login: Backend returned:', result);

      // Handle Remember Me checkbox
      if (rememberMe) {
        localStorage.setItem('rememberMe_email', email);
        localStorage.setItem('rememberMe_password', password);
        localStorage.setItem('rememberMe_checked', 'true');
      } else {
        // Clear saved credentials if Remember Me is unchecked
        localStorage.removeItem('rememberMe_email');
        localStorage.removeItem('rememberMe_password');
        localStorage.removeItem('rememberMe_checked');
      }

      // Store login info
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isAuthenticated', 'true');

      if (onLogin) {
        onLogin(email);
      }

      console.log('Login: All setup complete, navigating to home...');
      navigate('/');
    } catch (err: any) {
      console.error('Login: Caught error with full details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message,
        fullError: err
      });
      
      // Check different error formats
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Login failed. Please try again.');
      }
      console.error('Login: Error message set to:', err.response?.data?.detail || err.response?.data?.message || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column - Dark Background with Form */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-indigo-400 to-purple-500 p-4 rounded-full">
                <FaGraduationCap className="text-4xl text-white" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Career Academy</h2>
            <p className="text-indigo-200 text-sm sm:text-base">Intelligent Learning Management System</p>
          </div>

          {/* Login Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl hover:border-purple-500 transition-all">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Sign In</h2>

            {/* Error Message */}
            {error && (
              <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-400 text-xs sm:text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" style={{ top: '50%', marginTop: '-10px' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label className="flex items-center text-gray-400 hover:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                    disabled={loading}
                  />
                  <span className="ml-2">Remember me</span>
                </label>
                <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors bg-none border-none cursor-pointer p-0">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 sm:py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg text-sm sm:text-base"
              >
                <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                {!loading && <FaArrowRight size={18} />}
              </button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-6 sm:mt-8 p-4 bg-indigo-500/20 rounded-lg border border-indigo-400/30 backdrop-blur-sm">
              <p className="text-xs text-indigo-200 font-semibold mb-2">📧 Test Credentials:</p>
              <p className="text-xs text-indigo-100 font-mono">Email: john@mail.com</p>
              <p className="text-xs text-indigo-100 font-mono">Password: 12</p>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors bg-none border-none cursor-pointer p-0"
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs sm:text-sm md:text-base mt-6 sm:mt-8">
            © 2026 Career Academy. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Column - Dark Blue Background with Gradient */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-900 via-purple-800 to-slate-900 hidden lg:flex items-center justify-center p-8">
        <div className="text-center">
          <FaGraduationCap className="text-8xl text-purple-300 mx-auto mb-6 opacity-30" />
          <h3 className="text-3xl font-bold text-white mb-4">Welcome Back</h3>
          <p className="text-lg text-purple-200 max-w-md">
            Access your learning dashboard and continue your educational journey with Career Academy
          </p>
        </div>
      </div>
    </div>
  );
}
