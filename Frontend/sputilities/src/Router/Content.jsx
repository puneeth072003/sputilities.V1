import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// Pages - Lazy loaded for better performance
import LandingPage from "../pages/LandingPage"; // Keep landing page eager for SEO
import Login from "../pages/Login"; // Keep login eager for UX
import AuthCallback from "../pages/AuthCallback"; // Keep auth callback eager

// Lazy load main app pages
import { createLazyRoute, preloadCriticalRoutes } from "../utils/lazyLoading.jsx";

const Dashboard = createLazyRoute(() => import(/* webpackChunkName: "dashboard" */ "../pages/Dashboard"));
const PlaylistManager = createLazyRoute(() => import(/* webpackChunkName: "playlist-manager" */ "../pages/PlaylistManager"));
const LikedSongs = createLazyRoute(() => import(/* webpackChunkName: "liked-songs" */ "../pages/LikedSongs"));
const Operations = createLazyRoute(() => import(/* webpackChunkName: "operations" */ "../pages/Operations"));
const SmartFeatures = createLazyRoute(() => import(/* webpackChunkName: "smart-features" */ "../pages/SmartFeatures"));
const Settings = createLazyRoute(() => import(/* webpackChunkName: "settings" */ "../pages/Settings"));

// Components
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";

// Data Management
import { queryClient, backgroundSync, performanceMonitor } from "../utils/dataManager.js";

// Performance and Error Handling
import ErrorBoundary from "../components/ErrorBoundary";
import { initializePerformanceMonitoring } from "../utils/performance.js";

const Content = () => {
  useEffect(() => {
    // Initialize performance monitoring
    initializePerformanceMonitoring();

    // Initialize background sync and performance monitoring
    const cleanupAutoRefresh = backgroundSync.startAutoRefresh();
    const cleanupReconnectSync = backgroundSync.syncOnReconnect();
    const cleanupFocusSync = backgroundSync.syncOnFocus();

    // Start performance monitoring in development
    if (import.meta.env.DEV) {
      performanceMonitor.monitorQueries();
    }

    // Preload critical routes after initial load
    setTimeout(() => {
      preloadCriticalRoutes();
    }, 1000);

    return () => {
      cleanupAutoRefresh();
      cleanupReconnectSync();
      cleanupFocusSync();
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-spotify-black">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Protected Routes */}
            <Route path="/app" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="playlists" element={<PlaylistManager />} />
              <Route path="liked-songs" element={<LikedSongs />} />
              <Route path="operations" element={<Operations />} />
              <Route path="smart" element={<SmartFeatures />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#121212',
              color: '#fff',
              border: '1px solid #1DB954',
            },
            success: {
              iconTheme: {
                primary: '#1DB954',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

          {/* React Query Devtools - only in development */}
          {import.meta.env.DEV && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default Content;
