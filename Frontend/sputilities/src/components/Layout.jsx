import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import useAppStore from '../store/appStore';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="flex h-screen bg-spotify-black overflow-hidden">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="skip-link focus-visible"
      >
        Skip to main content
      </a>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-spotify-dark lg:relative lg:translate-x-0"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for larger screens */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 lg:pl-64">
        {/* Header */}
        <Header />
        
        {/* Page content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto bg-spotify-black focus:outline-none"
          tabIndex="-1"
        >
          <div className="relative min-h-full">
            {/* Parallax background */}
            <div className="parallax-bg" aria-hidden="true"></div>

            {/* Content */}
            <div className="relative z-10">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => useAppStore.getState().setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
