import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Music } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-spotify-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="mb-8"
        >
          <div className="relative">
            <h1 className="text-9xl font-bold text-spotify-green opacity-20">404</h1>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Music className="w-24 h-24 text-spotify-green" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Oops! The page you're looking for doesn't exist. 
            It might have been moved or deleted.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="btn-primary flex items-center space-x-2 px-6 py-3"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center space-x-2 px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <p className="text-gray-500 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/app/dashboard" className="text-spotify-green hover:underline">
              Dashboard
            </Link>
            <Link to="/app/playlists" className="text-spotify-green hover:underline">
              Playlists
            </Link>
            <Link to="/app/liked-songs" className="text-spotify-green hover:underline">
              Liked Songs
            </Link>
            <Link to="/app/smart" className="text-spotify-green hover:underline">
              Smart Features
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;

