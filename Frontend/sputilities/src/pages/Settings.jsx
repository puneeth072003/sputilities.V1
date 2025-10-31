import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <SettingsIcon className="w-8 h-8 text-spotify-green" />
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </div>
        <p className="text-gray-400">Customize your Sputilities experience</p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Account Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-5 h-5 text-spotify-green" />
            <h2 className="text-xl font-bold text-white">Account</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Connected Account</p>
                <p className="text-gray-400 text-sm">spotify_user_123</p>
              </div>
              <button className="btn-secondary text-sm">Disconnect</button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-5 h-5 text-spotify-green" />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Operation Completion</p>
                <p className="text-gray-400 text-sm">Get notified when operations complete</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-spotify-green"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-spotify-green" />
            <h2 className="text-xl font-bold text-white">Privacy & Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Data Collection</p>
                <p className="text-gray-400 text-sm">Allow anonymous usage analytics</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-spotify-green"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="w-5 h-5 text-spotify-green" />
            <h2 className="text-xl font-bold text-white">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-white font-medium mb-2">Theme</p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-spotify-green text-white rounded-lg text-sm">Dark</button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm">Light</button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm">Auto</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
