import React from 'react';
import { Menu, Search, Bell, User, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import useAppStore from '../store/appStore';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { sidebarOpen, setSidebarOpen, searchQuery, setSearchQuery, notifications } = useAppStore();
  const { user, logout, isLoggingOut } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-spotify-dark/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between"
    >
      {/* Left side */}
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search playlists, songs, operations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 bg-spotify-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-spotify-green transition-colors"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Bell className="w-5 h-5 text-white" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                {notifications.length > 9 ? '9+' : notifications.length}
              </span>
            )}
          </button>
        </div>

        {/* User menu */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-400">{user?.id || 'spotify_user'}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="w-4 h-4 text-white" />
            </button>
            
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
