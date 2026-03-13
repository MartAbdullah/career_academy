import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaGraduationCap } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // Make visible with a slight delay when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Delete message after a certain time
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberMe_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      await login({ email, password });
      
      if (rememberMe) {
        localStorage.setItem('rememberMe_email', email);
      } else {
        localStorage.removeItem('rememberMe_email');
      }

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[#0f172a] p-4 font-sans antialiased transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative w-full max-w-[1000px] flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side: Branding and Info */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-12 flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <FaGraduationCap size={32} />
              </div>
              <span className="text-2xl font-bold tracking-tight">Career Academy</span>
            </div>
            <h1 className="text-4xl font-extrabold mb-6 leading-tight">
              Start <br /> <span className="text-indigo-200">Coding</span> Your Future
            </h1>
            <p className="text-indigo-100/80 text-lg leading-relaxed">
              Learn modern technologies, join our community, and take your career to the next level.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-indigo-400/30 flex items-center justify-center">
                <FaArrowRight className="text-white" />
              </div>
              <p className="text-sm font-medium">500+ Active Training Materials</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome</h2>
            <p className="text-slate-400">Continue by logging into your account</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-sans"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-sans"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500/20"
                />
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={() => navigate('/forgot-password')}
                className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-center gap-2">
            <span className="text-slate-500 text-sm">Don't have an account?</span>
            <button
              onClick={() => navigate('/register')}
              className="text-indigo-400 hover:text-indigo-300 font-bold text-sm transition-colors"
            >
              Sign Up Now
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold mb-3">Test Info</p>
            <div className="flex gap-4">
              <div className="text-xs text-slate-500">
                <span className="text-slate-400">Email:</span> john@mail.com
              </div>
              <div className="text-xs text-slate-500">
                <span className="text-slate-400">Password:</span> 12
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
