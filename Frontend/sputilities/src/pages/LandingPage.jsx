import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import {
  Music,
  Heart,
  Zap,
  Shield,
  Smartphone,
  Star,
  ArrowRight,
  Play,
} from 'lucide-react';

const features = [
  {
    icon: Music,
    title: 'Playlist Management',
    description: 'Create, delete, and organize your playlists with advanced bulk operations and smart filtering.',
  },
  {
    icon: Heart,
    title: 'Liked Songs Control',
    description: 'Manage your liked songs library with backup, reset, and analytics features.',
  },
  {
    icon: Zap,
    title: 'Smart Features',
    description: 'Duplicate detection, playlist comparison, smart merge, and intelligent sorting options.',
  },
  {
    icon: Shield,
    title: 'Safe Operations',
    description: 'All operations are tracked with progress monitoring and cancellation support.',
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-spotify-black text-white overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <Parallax
        blur={0}
        bgImage="/src/App/assets/sputilities.svg"
        bgImageAlt="Spotify Background"
        strength={200}
        className="min-h-screen"
      >
        <div className="min-h-screen bg-gradient-to-b from-spotify-green/20 to-spotify-black/80 flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <img
                src="/src/App/assets/sputilities.svg"
                alt="Sputilities Logo"
                className="w-48 h-48 mx-auto"
              />
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                <span className="text-gradient">Sputilities.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                The ultimate toolkit for Spotify power users. Manage playlists, 
                organize your music library, and discover new ways to enjoy your favorite songs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/login"
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 hover-lift"
                >
                  <Play className="w-5 h-5" />
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <a
                  href="#features"
                  className="btn-secondary text-lg px-8 py-4 hover-lift"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </Parallax>

      {/* Features Section */}
      <section id="features" className="py-20 bg-spotify-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for Music Lovers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover all the tools you need to take control of your Spotify experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover-lift"
              >
                <div className="w-12 h-12 bg-spotify-green rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-spotify-green to-green-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Spotify Experience?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the power of Sputilities
            </p>
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 bg-white text-spotify-green font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors hover-lift"
            >
              <span>Start Using Sputilities</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-spotify-black border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Sputilities. Made with ❤️ for Spotify users.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
