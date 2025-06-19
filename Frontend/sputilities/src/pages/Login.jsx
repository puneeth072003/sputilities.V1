import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, ArrowLeft, ExternalLink } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const { login, isLoading, isAuthenticated, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/app/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="min-h-screen bg-spotify-black flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-spotify-green/20 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="card text-center"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Sputilities</h1>
            <p className="text-gray-300">
              Connect your Spotify account to get started with powerful playlist management tools
            </p>
          </div>

          {/* Login Button */}
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={isLoading || isLoggingIn}
              className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading || isLoggingIn ? (
                <LoadingSpinner size="small" color="white" />
              ) : (
                <>
                  <Music className="w-5 h-5" />
                  <span>Connect with Spotify</span>
                  <ExternalLink className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-gray-400">
              By connecting, you agree to let Sputilities access your Spotify playlists and liked songs.
              We never store your personal data or modify your account without permission.
            </p>
          </div>

          {/* Features Preview */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">What you can do:</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-spotify-green rounded-full"></div>
                <span>Manage and organize your playlists</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-spotify-green rounded-full"></div>
                <span>Control your liked songs library</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-spotify-green rounded-full"></div>
                <span>Use smart features like duplicate detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-spotify-green rounded-full"></div>
                <span>Track operations with real-time progress</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
