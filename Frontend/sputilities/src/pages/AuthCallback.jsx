import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Music } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refetchAuth } = useAuth();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('Authenticating with Spotify...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for error in URL params
        const error = searchParams.get('error');
        if (error) {
          setStatus('error');
          setMessage('Authentication was cancelled or failed. Please try again.');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // Refetch auth status to get updated user data
        await refetchAuth();

        // Give a moment for the auth state to update
        setTimeout(() => {
          setStatus('success');
          setMessage('Successfully authenticated! Redirecting to dashboard...');
          setTimeout(() => navigate('/app/dashboard'), 2000);
        }, 1000);

      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage('An error occurred during authentication. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, refetchAuth, navigate]);

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500" />;
      default:
        return <LoadingSpinner size="xl" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-spotify-green';
    }
  };

  return (
    <div className="min-h-screen bg-spotify-black flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-spotify-green/20 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="card text-center"
        >
          {/* Logo */}
          <div className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="w-6 h-6 text-white" />
          </div>

          {/* Status Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            {getIcon()}
          </motion.div>

          {/* Status Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
              {status === 'loading' && 'Authenticating...'}
              {status === 'success' && 'Authentication Successful!'}
              {status === 'error' && 'Authentication Failed'}
            </h1>
            
            <p className="text-gray-300 mb-6">
              {message}
            </p>

            {status === 'success' && (
              <div className="space-y-2 text-sm text-gray-400">
                <p>✓ Connected to Spotify</p>
                <p>✓ Permissions granted</p>
                <p>✓ Setting up your dashboard</p>
              </div>
            )}

            {status === 'error' && (
              <button
                onClick={() => navigate('/login')}
                className="btn-primary mt-4"
              >
                Try Again
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthCallback;
