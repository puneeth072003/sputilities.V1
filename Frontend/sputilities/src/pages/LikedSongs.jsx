import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Heart,
  Download,
  RotateCcw,
  Search,
  Play,
  ExternalLink,
  Clock,
  Calendar,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { likedSongsAPI } from '../services/api';
import useAppStore from '../store/appStore';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const LikedSongs = () => {
  const queryClient = useQueryClient();
  const { searchQuery, setSearchQuery, filters, updateFilter } = useAppStore();

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('liked_at');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fetch liked songs
  const { data: likedSongsData, isLoading } = useQuery({
    queryKey: ['liked-songs', {
      search: searchQuery,
      ...filters.likedSongs,
      sort_by: sortBy,
      sort_order: sortOrder
    }],
    queryFn: async () => {
      const params = {
        search: searchQuery || undefined,
        ...filters.likedSongs,
        sort_by: sortBy,
        sort_order: sortOrder,
        limit: 50
      };

      // Remove null/undefined values
      Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === undefined || params[key] === '') {
          delete params[key];
        }
      });

      const response = await likedSongsAPI.getLikedSongs(params);
      return response.data.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  // Fetch analytics
  const { data: analyticsData } = useQuery({
    queryKey: ['liked-songs-analytics'],
    queryFn: async () => {
      const response = await likedSongsAPI.getAnalytics();
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Backup mutation
  const backupMutation = useMutation({
    mutationFn: (data) => likedSongsAPI.backup(data),
    onSuccess: () => {
      toast.success('Backup started! Check operations for progress.');
    },
    onError: (error) => {
      toast.error('Failed to start backup');
      console.error('Backup error:', error);
    }
  });

  // Reset mutation
  const resetMutation = useMutation({
    mutationFn: () => likedSongsAPI.reset(),
    onSuccess: () => {
      queryClient.invalidateQueries(['liked-songs']);
      toast.success('Reset started! This will take a while.');
    },
    onError: (error) => {
      toast.error('Failed to start reset');
      console.error('Reset error:', error);
    }
  });

  const likedSongs = likedSongsData || [];

  const handleBackup = () => {
    const playlistName = prompt('Enter backup playlist name:', `Liked Songs Backup ${new Date().toLocaleDateString()}`);
    if (playlistName) {
      backupMutation.mutate({
        playlistName,
        description: `Backup of liked songs created on ${new Date().toLocaleDateString()}`,
        isPublic: false
      });
    }
  };

  const handleReset = () => {
    const confirmation = prompt('This will REMOVE ALL your liked songs! Type "RESET" to confirm:');
    if (confirmation === 'RESET') {
      resetMutation.mutate();
    } else if (confirmation !== null) {
      toast.error('Reset cancelled - confirmation text did not match');
    }
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const openInSpotify = (trackId) => {
    window.open(`https://open.spotify.com/track/${trackId}`, '_blank');
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Liked Songs</h1>
            <p className="text-gray-400">
              Manage your liked songs library • {likedSongs.length} songs
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleBackup}
              disabled={backupMutation.isPending}
              className="btn-secondary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Backup</span>
            </button>
            <button
              onClick={handleReset}
              disabled={resetMutation.isPending}
              className="btn-secondary flex items-center space-x-2 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
      >
        {analyticsData ? [
          {
            label: 'Total Liked Songs',
            value: analyticsData.totalLikedSongs?.toLocaleString() || '0',
            icon: Heart,
            color: 'text-red-400'
          },
          {
            label: 'Added via App',
            value: analyticsData.appAddedSongs?.toLocaleString() || '0',
            icon: Download,
            color: 'text-blue-400'
          },
          {
            label: 'Total Duration',
            value: analyticsData.totalDurationFormatted || '0h 0m',
            icon: Clock,
            color: 'text-green-400'
          },
          {
            label: 'Average Duration',
            value: analyticsData.averageDurationFormatted || '0:00',
            icon: Calendar,
            color: 'text-yellow-400'
          },
        ] : [].map((stat, index) => (
          <div key={stat.label} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}

        {!analyticsData && (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                    <div className="h-8 bg-gray-700 rounded w-16"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </>
        )}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card mb-6"
      >
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your liked songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-sm"
              >
                <option value="liked_at">Date Liked</option>
                <option value="track_name">Song Name</option>
                <option value="artist_name">Artist</option>
                <option value="album_name">Album</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {sortOrder === 'asc' ?
                  <SortAsc className="w-4 h-4 text-gray-400" /> :
                  <SortDesc className="w-4 h-4 text-gray-400" />
                }
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-spotify-green text-white' : ''}`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="border-t border-gray-700 pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Added Via</label>
                  <select
                    value={filters.likedSongs.added_via_app || ''}
                    onChange={(e) => updateFilter('likedSongs', 'added_via_app', e.target.value || null)}
                    className="input-field w-full"
                  >
                    <option value="">All</option>
                    <option value="true">App Added</option>
                    <option value="false">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Source Playlist</label>
                  <input
                    type="text"
                    placeholder="Playlist ID"
                    value={filters.likedSongs.source_playlist_id || ''}
                    onChange={(e) => updateFilter('likedSongs', 'source_playlist_id', e.target.value || null)}
                    className="input-field w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="large" text="Loading liked songs..." />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && likedSongs.length === 0 && (
        <div className="card text-center py-12">
          <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No liked songs found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery ? 'Try adjusting your search or filters' : 'Start liking songs to see them here'}
          </p>
        </div>
      )}

      {/* Songs List */}
      {!isLoading && likedSongs.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-xl font-bold text-white mb-4">
            Your Liked Songs ({likedSongs.length})
          </h2>
          <div className="space-y-2">
            {likedSongs.map((song, index) => (
              <div
                key={song.spotify_track_id}
                className="flex items-center space-x-4 p-3 bg-spotify-black rounded-lg hover:bg-gray-800 transition-colors group"
              >
                {/* Album Art */}
                <div className="relative w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  {song.album?.image_url ? (
                    <img
                      src={song.album.image_url}
                      alt={song.album.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="w-6 h-6 text-gray-400" />
                    </div>
                  )}

                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => openInSpotify(song.spotify_track_id)}
                      className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Play className="w-3 h-3 text-black ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{song.track_name}</h3>
                  <p className="text-gray-400 text-sm truncate">
                    {song.artists?.map(artist => artist.name).join(', ')} • {song.album?.name}
                  </p>
                </div>

                {/* Duration and Date */}
                <div className="text-right flex-shrink-0">
                  <p className="text-gray-400 text-sm">{formatDuration(song.duration_ms)}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(song.liked_at).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => openInSpotify(song.spotify_track_id)}
                    className="p-1 rounded hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </button>
                  <Heart className="w-5 h-5 text-red-400 fill-current" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LikedSongs;
