import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Music,
  Heart,
  Activity,
  Zap,
  Settings,
  X,
} from 'lucide-react';
import useAppStore from '../store/appStore';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: Home },
  { name: 'Playlists', href: '/app/playlists', icon: Music },
  { name: 'Liked Songs', href: '/app/liked-songs', icon: Heart },
  { name: 'Operations', href: '/app/operations', icon: Activity },
  { name: 'Smart Features', href: '/app/smart', icon: Zap },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

const Sidebar = () => {
  const { setSidebarOpen } = useAppStore();

  return (
    <div className="flex flex-col h-full bg-spotify-dark">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-spotify-green rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Sputilities</span>
        </div>
        
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-spotify-green text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )
              }
              onClick={() => setSidebarOpen(false)} // Close sidebar on mobile after navigation
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={clsx(
                      'w-5 h-5 transition-colors',
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-400 text-center">
          <p>Spotify Utilities v1.0</p>
          <p className="mt-1">Made with ❤️ for music lovers</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
