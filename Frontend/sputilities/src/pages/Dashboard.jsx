import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Music, Heart, Activity, TrendingUp, Plus, Download, Zap } from 'lucide-react';
import { playlistManagerAPI, likedSongsAPI, operationsAPI } from '../services/api';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();

  // Fetch dashboard data
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await playlistManagerAPI.getDashboard();
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Fetch recent operations
  const { data: operationsData } = useQuery({
    queryKey: ['operations', { limit: 5 }],
    queryFn: async () => {
      const response = await operationsAPI.getOperations({ limit: 5, sort_by: 'createdAt', sort_order: 'desc' });
      return response.data.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  const stats = dashboardData ? [
    {
      icon: Music,
      label: 'Total Playlists',
      value: dashboardData.summary?.totalPlaylists || '0',
      color: 'text-blue-400',
      change: '+2 this week'
    },
    {
      icon: Heart,
      label: 'Liked Songs',
      value: dashboardData.summary?.totalLikedSongs || '0',
      color: 'text-red-400',
      change: '+15 this week'
    },
    {
      icon: Activity,
      label: 'Active Operations',
      value: dashboardData.summary?.pendingOperations || '0',
      color: 'text-yellow-400',
      change: 'Running now'
    },
    {
      icon: TrendingUp,
      label: 'App Created',
      value: dashboardData.analytics?.playlists?.appCreatedPlaylists || '0',
      color: 'text-green-400',
      change: 'Playlists'
    },
  ] : [];

  if (isDashboardLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <LoadingSpinner size="large" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-400">Here's your Spotify overview and recent activity.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card hover-lift cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className="btn-primary flex items-center space-x-2 justify-center"
            onClick={() => toast.success('Create playlist feature coming soon!')}
          >
            <Plus className="w-4 h-4" />
            <span>Create Playlist</span>
          </button>
          <button
            className="btn-secondary flex items-center space-x-2 justify-center"
            onClick={() => toast.success('Backup feature coming soon!')}
          >
            <Download className="w-4 h-4" />
            <span>Backup Liked Songs</span>
          </button>
          <button
            className="btn-secondary flex items-center space-x-2 justify-center"
            onClick={() => toast.success('Smart features coming soon!')}
          >
            <Zap className="w-4 h-4" />
            <span>Find Duplicates</span>
          </button>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Operations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Operations</h2>
          <div className="space-y-3">
            {operationsData && operationsData.length > 0 ? (
              operationsData.map((operation, index) => (
                <div key={operation._id} className="flex items-center space-x-3 p-3 bg-spotify-black rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    operation.status === 'completed' ? 'bg-green-400' :
                    operation.status === 'in_progress' ? 'bg-blue-400' :
                    operation.status === 'failed' ? 'bg-red-400' : 'bg-yellow-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-white text-sm capitalize">
                      {operation.operation_type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {operation.status} • {new Date(operation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {operation.progress?.percentage || 0}%
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No recent operations</p>
                <p className="text-gray-500 text-sm">Your operations will appear here</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Analytics Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h2 className="text-xl font-bold text-white mb-4">Analytics Overview</h2>
          {dashboardData?.analytics ? (
            <div className="space-y-4">
              <div className="p-3 bg-spotify-black rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Average Tracks per Playlist</span>
                  <span className="text-white font-medium">
                    {dashboardData.analytics.playlists?.averageTracksPerPlaylist || 0}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-spotify-green h-2 rounded-full"
                    style={{ width: `${Math.min((dashboardData.analytics.playlists?.averageTracksPerPlaylist || 0) / 50 * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-3 bg-spotify-black rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Public Playlists</span>
                  <span className="text-white font-medium">
                    {dashboardData.analytics.playlists?.publicPlaylists || 0}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (dashboardData.analytics.playlists?.publicPlaylists || 0) /
                        (dashboardData.analytics.playlists?.totalPlaylists || 1) * 100,
                        100
                      )}%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="p-3 bg-spotify-black rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Listening Time</span>
                  <span className="text-white font-medium">
                    {dashboardData.analytics.likedSongs?.totalDurationFormatted || '0h 0m'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Analytics loading...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
