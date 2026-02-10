import { API_BASE_URL } from "../config";
import { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Lock, Mail } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: string) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsError(false);
  
    try {
      const res = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
      });
  
      setMessage(res.data.message || 'Login successful.');
      setIsError(false);
  
      onNavigate('home');
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        'Unable to login. Please check your details and try again.';
      setMessage(errMsg);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-[calc(100vh-64px)] page-transition py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="card-premium rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
          <p className="text-gray-400 mb-8">
            Welcome back! Sign in to continue using AI Study Buddy.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent transition-all hover:border-gray-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent transition-all hover:border-gray-600"
                  required
                />
              </div>
            </div>

            {message && (
              <div
                className={`text-sm rounded-lg px-4 py-3 ${
                  isError
                    ? 'bg-red-500/10 text-red-400 border border-red-500/40'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="button-premium w-full px-6 py-3 bg-gradient-to-r from-[#1F6FEB] to-[#58A6FF] text-white rounded-xl font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-[#1F6FEB]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="text-[#58A6FF] hover:text-[#7d5ff5] font-medium"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

