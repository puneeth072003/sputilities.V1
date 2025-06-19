import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Download,
  Grid,
  List,
  SortAsc,
  SortDesc,
  CheckSquare,
  Square
} from 'lucide-react';
import { playlistsAPI, playlistManagerAPI, likedSongsAPI } from '../services/api';
import useAppStore from '../store/appStore';
import PlaylistCard from '../components/PlaylistCard';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const PlaylistManager = () => {
  const queryClient = useQueryClient();
  const {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    selectedPlaylists,
    togglePlaylistSelection,
    selectAllPlaylists,
    clearPlaylistSelection
  } = useAppStore();

  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fetch playlists with filters
  const { data: playlistsData, isLoading, error } = useQuery({
    queryKey: ['playlists', {
      search: searchQuery,
      ...filters.playlists,
      sort_by: sortBy,
      sort_order: sortOrder
    }],
    queryFn: async () => {
      const params = {
        search: searchQuery || undefined,
        ...filters.playlists,
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

      const response = await playlistManagerAPI.getPlaylists(params);
      return response.data.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  // Create playlist mutation
  const createPlaylistMutation = useMutation({
    mutationFn: (data) => playlistsAPI.createPlaylist(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
      toast.success('Playlist created successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create playlist');
      console.error('Create playlist error:', error);
    }
  });

  // Delete playlist mutation
  const deletePlaylistMutation = useMutation({
    mutationFn: (playlistId) => playlistsAPI.deletePlaylist(playlistId),
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
      toast.success('Playlist deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete playlist');
      console.error('Delete playlist error:', error);
    }
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: (playlistIds) => playlistsAPI.bulkDelete(playlistIds),
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
      clearPlaylistSelection();
      toast.success('Playlists deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete playlists');
      console.error('Bulk delete error:', error);
    }
  });

  // Like all songs mutation
  const likeAllSongsMutation = useMutation({
    mutationFn: (playlistId) => likedSongsAPI.likePlaylist(playlistId),
    onSuccess: () => {
      toast.success('Started liking all songs from playlist!');
    },
    onError: (error) => {
      toast.error('Failed to start liking songs');
      console.error('Like all songs error:', error);
    }
  });

  const playlists = playlistsData || [];
  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlist => {
      if (searchQuery) {
        return playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               (playlist.description && playlist.description.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      return true;
    });
  }, [playlists, searchQuery]);

  const handleCreatePlaylist = () => {
    const name = prompt('Enter playlist name:');
    if (name) {
      createPlaylistMutation.mutate({
        name,
        description: `Created via Sputilities on ${new Date().toLocaleDateString()}`,
        isPublic: false,
        metadata: {
          app_feature: 'playlist_manager'
        }
      });
    }
  };

  const handleDeletePlaylist = (playlistId) => {
    if (confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylistMutation.mutate(playlistId);
    }
  };

  const handleBulkDelete = () => {
    if (selectedPlaylists.length === 0) {
      toast.error('No playlists selected');
      return;
    }

    if (confirm(`Are you sure you want to delete ${selectedPlaylists.length} playlist(s)?`)) {
      bulkDeleteMutation.mutate(selectedPlaylists);
    }
  };

  const handleLikeAllSongs = (playlistId) => {
    if (confirm('This will add all songs from this playlist to your liked songs. Continue?')) {
      likeAllSongsMutation.mutate(playlistId);
    }
  };

  const handleSelectAll = () => {
    if (selectedPlaylists.length === filteredPlaylists.length) {
      clearPlaylistSelection();
    } else {
      selectAllPlaylists(filteredPlaylists.map(p => p.spotify_id));
    }
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
            <h1 className="text-3xl font-bold text-white mb-2">Playlist Manager</h1>
            <p className="text-gray-400">
              Manage and organize your Spotify playlists • {filteredPlaylists.length} playlists
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {selectedPlaylists.length > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={bulkDeleteMutation.isPending}
                className="btn-secondary text-red-400 border-red-400 hover:bg-red-400 hover:text-white flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete ({selectedPlaylists.length})</span>
              </button>
            )}
            <button
              onClick={handleCreatePlaylist}
              disabled={createPlaylistMutation.isPending}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Playlist</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search, Filters, and Controls */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card mb-6"
      >
        <div className="space-y-4">
          {/* Search and View Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>

            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-spotify-green text-white' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-spotify-green text-white' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Controls */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-sm"
              >
                <option value="createdAt">Date Created</option>
                <option value="name">Name</option>
                <option value="total_tracks">Track Count</option>
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
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-700 pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Created Via</label>
                    <select
                      value={filters.playlists.created_via_app || ''}
                      onChange={(e) => updateFilter('playlists', 'created_via_app', e.target.value || null)}
                      className="input-field w-full"
                    >
                      <option value="">All</option>
                      <option value="true">App Created</option>
                      <option value="false">Manual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Visibility</label>
                    <select
                      value={filters.playlists.is_public || ''}
                      onChange={(e) => updateFilter('playlists', 'is_public', e.target.value || null)}
                      className="input-field w-full"
                    >
                      <option value="">All</option>
                      <option value="true">Public</option>
                      <option value="false">Private</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Track Count</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.playlists.min_tracks || ''}
                        onChange={(e) => updateFilter('playlists', 'min_tracks', e.target.value || null)}
                        className="input-field flex-1"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.playlists.max_tracks || ''}
                        onChange={(e) => updateFilter('playlists', 'max_tracks', e.target.value || null)}
                        className="input-field flex-1"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selection Controls */}
          {filteredPlaylists.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-700 pt-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {selectedPlaylists.length === filteredPlaylists.length ?
                    <CheckSquare className="w-4 h-4" /> :
                    <Square className="w-4 h-4" />
                  }
                  <span>
                    {selectedPlaylists.length === filteredPlaylists.length ? 'Deselect All' : 'Select All'}
                  </span>
                </button>

                {selectedPlaylists.length > 0 && (
                  <span className="text-sm text-gray-400">
                    {selectedPlaylists.length} selected
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="large" text="Loading playlists..." />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="card text-center py-12">
          <p className="text-red-400 mb-4">Failed to load playlists</p>
          <button
            onClick={() => queryClient.invalidateQueries(['playlists'])}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredPlaylists.length === 0 && (
        <div className="card text-center py-12">
          <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No playlists found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery ? 'Try adjusting your search or filters' : 'Create your first playlist to get started'}
          </p>
          <button onClick={handleCreatePlaylist} className="btn-primary">
            Create Playlist
          </button>
        </div>
      )}

      {/* Playlist Grid/List */}
      {!isLoading && !error && filteredPlaylists.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {filteredPlaylists.map((playlist, index) => (
            <PlaylistCard
              key={playlist.spotify_id}
              playlist={playlist}
              isSelected={selectedPlaylists.includes(playlist.spotify_id)}
              onSelect={togglePlaylistSelection}
              onDelete={handleDeletePlaylist}
              onLikeAll={handleLikeAllSongs}
              className={viewMode === 'list' ? 'flex items-center space-x-4' : ''}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PlaylistManager;
