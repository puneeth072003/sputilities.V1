import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Zap,
  Copy,
  GitMerge,
  ArrowUpDown,
  Search,
  Play,
  Settings,
  ChevronRight,
  X,
  Plus,
  Minus,
  BarChart3,
  Filter,
  Music,
  Clock,
  Users,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { smartAPI, playlistManagerAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const SmartFeatures = () => {
  const queryClient = useQueryClient();
  const [activeFeature, setActiveFeature] = useState(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [duplicateResults, setDuplicateResults] = useState(null);
  const [comparisonResults, setComparisonResults] = useState(null);
  const [mergePreview, setMergePreview] = useState(null);

  // Fetch user playlists for selection
  const { data: playlistsData } = useQuery({
    queryKey: ['playlists-for-smart'],
    queryFn: async () => {
      const response = await playlistManagerAPI.getPlaylists({ limit: 100 });
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Fetch genres for sorting
  const { data: genresData } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const response = await smartAPI.getGenres();
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Mutations
  const findDuplicatesMutation = useMutation({
    mutationFn: (playlistId) => smartAPI.findDuplicates(playlistId),
    onSuccess: (response) => {
      setDuplicateResults(response.data.data);
      toast.success('Duplicates found!');
    },
    onError: (error) => {
      toast.error('Failed to find duplicates');
      console.error('Find duplicates error:', error);
    }
  });

  const removeDuplicatesMutation = useMutation({
    mutationFn: ({ playlistId, duplicates }) => smartAPI.removeDuplicates(playlistId, { duplicates }),
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
      setDuplicateResults(null);
      toast.success('Duplicates removal started! Check operations for progress.');
    },
    onError: (error) => {
      toast.error('Failed to remove duplicates');
      console.error('Remove duplicates error:', error);
    }
  });

  const comparePlaylistsMutation = useMutation({
    mutationFn: (data) => smartAPI.comparePlaylists(data),
    onSuccess: (response) => {
      setComparisonResults(response.data.data);
      toast.success('Playlists compared successfully!');
    },
    onError: (error) => {
      toast.error('Failed to compare playlists');
      console.error('Compare playlists error:', error);
    }
  });

  const previewMergeMutation = useMutation({
    mutationFn: (data) => smartAPI.previewMerge(data),
    onSuccess: (response) => {
      setMergePreview(response.data.data);
      toast.success('Merge preview generated!');
    },
    onError: (error) => {
      toast.error('Failed to generate merge preview');
      console.error('Preview merge error:', error);
    }
  });

  const mergePlaylistsMutation = useMutation({
    mutationFn: (data) => smartAPI.mergePlaylists(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
      setMergePreview(null);
      setSelectedPlaylists([]);
      toast.success('Playlist merge started! Check operations for progress.');
    },
    onError: (error) => {
      toast.error('Failed to merge playlists');
      console.error('Merge playlists error:', error);
    }
  });

  const sortPlaylistMutation = useMutation({
    mutationFn: ({ playlistId, sortOptions }) => smartAPI.sortPlaylist(playlistId, sortOptions),
    onSuccess: () => {
      toast.success('Playlist sorting started! Check operations for progress.');
    },
    onError: (error) => {
      toast.error('Failed to sort playlist');
      console.error('Sort playlist error:', error);
    }
  });

  const playlists = playlistsData || [];
  const genres = genresData || [];

  const features = [
    {
      id: 'duplicates',
      icon: Copy,
      title: 'Duplicate Detection',
      description: 'Find and remove duplicate tracks in your playlists',
      action: 'Find Duplicates',
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'comparison',
      icon: Search,
      title: 'Playlist Comparison',
      description: 'Compare playlists to find similarities and differences',
      action: 'Compare Playlists',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'merge',
      icon: GitMerge,
      title: 'Smart Merge',
      description: 'Intelligently combine multiple playlists with advanced options',
      action: 'Merge Playlists',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'sort',
      icon: ArrowUpDown,
      title: 'Smart Sorting',
      description: 'Sort playlists by various criteria including audio features',
      action: 'Sort Playlist',
      color: 'from-purple-500 to-violet-500',
    },
  ];

  const handleFeatureClick = (featureId) => {
    setActiveFeature(featureId);
    setDuplicateResults(null);
    setComparisonResults(null);
    setMergePreview(null);
    setSelectedPlaylists([]);
  };

  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylists(prev =>
      prev.includes(playlistId)
        ? prev.filter(id => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  const handleFindDuplicates = (playlistId) => {
    findDuplicatesMutation.mutate(playlistId);
  };

  const handleRemoveDuplicates = (playlistId, duplicates) => {
    if (confirm(`Remove ${duplicates.length} duplicate tracks?`)) {
      removeDuplicatesMutation.mutate({ playlistId, duplicates });
    }
  };

  const handleComparePlaylists = () => {
    if (selectedPlaylists.length < 2) {
      toast.error('Select at least 2 playlists to compare');
      return;
    }
    comparePlaylistsMutation.mutate({ playlistIds: selectedPlaylists });
  };

  const handlePreviewMerge = () => {
    if (selectedPlaylists.length < 2) {
      toast.error('Select at least 2 playlists to merge');
      return;
    }

    const mergeOptions = {
      playlistIds: selectedPlaylists,
      removeDuplicates: true,
      sortBy: 'popularity',
      newPlaylistName: `Merged Playlist ${new Date().toLocaleDateString()}`
    };

    previewMergeMutation.mutate(mergeOptions);
  };

  const handleMergePlaylists = () => {
    if (!mergePreview) return;

    const mergeOptions = {
      playlistIds: selectedPlaylists,
      removeDuplicates: true,
      sortBy: 'popularity',
      newPlaylistName: mergePreview.name,
      description: mergePreview.description
    };

    mergePlaylistsMutation.mutate(mergeOptions);
  };

  const handleSortPlaylist = (playlistId, sortOptions) => {
    sortPlaylistMutation.mutate({ playlistId, sortOptions });
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-8 h-8 text-spotify-green" />
          <h1 className="text-3xl font-bold text-white">Smart Features</h1>
        </div>
        <p className="text-gray-400">Advanced tools to optimize and organize your music library</p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card hover-lift cursor-pointer group relative overflow-hidden"
            onClick={() => handleFeatureClick(feature.id)}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

            <div className="relative flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <button className="btn-primary text-sm">
                    {feature.action}
                  </button>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature Modals */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setActiveFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-spotify-dark rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {features.find(f => f.id === activeFeature)?.title}
                </h3>
                <button
                  onClick={() => setActiveFeature(null)}
                  className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Duplicate Detection */}
              {activeFeature === 'duplicates' && (
                <div className="space-y-6">
                  <p className="text-gray-400">
                    Select a playlist to scan for duplicate tracks. Duplicates are identified by matching track names and artists.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.spotify_id}
                        className="card hover-lift cursor-pointer"
                        onClick={() => handleFindDuplicates(playlist.spotify_id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Music className="w-8 h-8 text-spotify-green" />
                          <div className="flex-1">
                            <h4 className="text-white font-medium truncate">{playlist.name}</h4>
                            <p className="text-gray-400 text-sm">{playlist.total_tracks} tracks</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {findDuplicatesMutation.isPending && (
                    <div className="text-center py-8">
                      <LoadingSpinner size="large" text="Scanning for duplicates..." />
                    </div>
                  )}

                  {duplicateResults && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-white">
                        Found {duplicateResults.duplicates?.length || 0} Duplicates
                      </h4>

                      {duplicateResults.duplicates?.length > 0 ? (
                        <>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {duplicateResults.duplicates.map((duplicate, index) => (
                              <div key={index} className="p-3 bg-spotify-black rounded-lg">
                                <p className="text-white font-medium">{duplicate.track_name}</p>
                                <p className="text-gray-400 text-sm">{duplicate.artist_name}</p>
                                <p className="text-gray-500 text-xs">Found {duplicate.count} times</p>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => handleRemoveDuplicates(duplicateResults.playlist_id, duplicateResults.duplicates)}
                            disabled={removeDuplicatesMutation.isPending}
                            className="btn-primary w-full"
                          >
                            Remove All Duplicates
                          </button>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                          <p className="text-white">No duplicates found!</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Playlist Comparison */}
              {activeFeature === 'comparison' && (
                <div className="space-y-6">
                  <p className="text-gray-400">
                    Select multiple playlists to compare their tracks and find similarities or differences.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.spotify_id}
                        className={`card hover-lift cursor-pointer transition-all ${
                          selectedPlaylists.includes(playlist.spotify_id)
                            ? 'ring-2 ring-spotify-green bg-spotify-green/10'
                            : ''
                        }`}
                        onClick={() => handlePlaylistSelect(playlist.spotify_id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Music className="w-8 h-8 text-spotify-green" />
                            {selectedPlaylists.includes(playlist.spotify_id) && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-spotify-green rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {selectedPlaylists.indexOf(playlist.spotify_id) + 1}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium truncate">{playlist.name}</h4>
                            <p className="text-gray-400 text-sm">{playlist.total_tracks} tracks</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">
                      Selected: {selectedPlaylists.length} playlists
                    </p>
                    <button
                      onClick={handleComparePlaylists}
                      disabled={selectedPlaylists.length < 2 || comparePlaylistsMutation.isPending}
                      className="btn-primary"
                    >
                      Compare Playlists
                    </button>
                  </div>

                  {comparePlaylistsMutation.isPending && (
                    <div className="text-center py-8">
                      <LoadingSpinner size="large" text="Comparing playlists..." />
                    </div>
                  )}

                  {comparisonResults && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-white">Comparison Results</h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="card">
                          <div className="text-center">
                            <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">{comparisonResults.common_tracks?.length || 0}</p>
                            <p className="text-gray-400 text-sm">Common Tracks</p>
                          </div>
                        </div>

                        <div className="card">
                          <div className="text-center">
                            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">{comparisonResults.unique_tracks?.length || 0}</p>
                            <p className="text-gray-400 text-sm">Unique Tracks</p>
                          </div>
                        </div>

                        <div className="card">
                          <div className="text-center">
                            <Music className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">{comparisonResults.total_tracks || 0}</p>
                            <p className="text-gray-400 text-sm">Total Tracks</p>
                          </div>
                        </div>
                      </div>

                      {comparisonResults.common_tracks?.length > 0 && (
                        <div>
                          <h5 className="text-white font-medium mb-2">Common Tracks</h5>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {comparisonResults.common_tracks.slice(0, 10).map((track, index) => (
                              <div key={index} className="p-2 bg-spotify-black rounded">
                                <p className="text-white text-sm">{track.name}</p>
                                <p className="text-gray-400 text-xs">{track.artist}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Smart Merge */}
              {activeFeature === 'merge' && (
                <div className="space-y-6">
                  <p className="text-gray-400">
                    Select multiple playlists to merge them into a new playlist with smart deduplication and sorting.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.spotify_id}
                        className={`card hover-lift cursor-pointer transition-all ${
                          selectedPlaylists.includes(playlist.spotify_id)
                            ? 'ring-2 ring-spotify-green bg-spotify-green/10'
                            : ''
                        }`}
                        onClick={() => handlePlaylistSelect(playlist.spotify_id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Music className="w-8 h-8 text-spotify-green" />
                          <div className="flex-1">
                            <h4 className="text-white font-medium truncate">{playlist.name}</h4>
                            <p className="text-gray-400 text-sm">{playlist.total_tracks} tracks</p>
                          </div>
                          {selectedPlaylists.includes(playlist.spotify_id) && (
                            <div className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">
                      Selected: {selectedPlaylists.length} playlists
                    </p>
                    <button
                      onClick={handlePreviewMerge}
                      disabled={selectedPlaylists.length < 2 || previewMergeMutation.isPending}
                      className="btn-secondary"
                    >
                      Preview Merge
                    </button>
                  </div>

                  {previewMergeMutation.isPending && (
                    <div className="text-center py-8">
                      <LoadingSpinner size="large" text="Generating merge preview..." />
                    </div>
                  )}

                  {mergePreview && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-white">Merge Preview</h4>

                      <div className="card">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-400">New Playlist Name</label>
                            <p className="text-white">{mergePreview.name}</p>
                          </div>

                          <div>
                            <label className="text-sm text-gray-400">Total Tracks</label>
                            <p className="text-white">{mergePreview.total_tracks}</p>
                          </div>

                          <div>
                            <label className="text-sm text-gray-400">Duplicates Removed</label>
                            <p className="text-white">{mergePreview.duplicates_removed}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleMergePlaylists}
                        disabled={mergePlaylistsMutation.isPending}
                        className="btn-primary w-full"
                      >
                        Create Merged Playlist
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Smart Sorting */}
              {activeFeature === 'sort' && (
                <div className="space-y-6">
                  <p className="text-gray-400">
                    Sort your playlists by various criteria including audio features like energy, danceability, and popularity.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.map((playlist) => (
                      <div key={playlist.spotify_id} className="card">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Music className="w-8 h-8 text-spotify-green" />
                            <div className="flex-1">
                              <h4 className="text-white font-medium truncate">{playlist.name}</h4>
                              <p className="text-gray-400 text-sm">{playlist.total_tracks} tracks</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <select className="input-field w-full text-sm">
                              <option value="popularity">Popularity</option>
                              <option value="energy">Energy Level</option>
                              <option value="danceability">Danceability</option>
                              <option value="valence">Mood (Valence)</option>
                              <option value="tempo">Tempo</option>
                              <option value="release_date">Release Date</option>
                              <option value="duration">Duration</option>
                              <option value="alphabetical">Alphabetical</option>
                            </select>

                            <button
                              onClick={() => handleSortPlaylist(playlist.spotify_id, { sortBy: 'popularity', order: 'desc' })}
                              disabled={sortPlaylistMutation.isPending}
                              className="btn-primary w-full text-sm"
                            >
                              Sort Playlist
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Smart Operations */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-white mb-4">Recent Smart Operations</h2>
        <div className="space-y-3">
          {[
            { type: 'Duplicate Detection', playlist: 'My Favorites', result: '5 duplicates found and removed', time: '2 hours ago' },
            { type: 'Smart Merge', playlist: 'Workout Mix + Gym Hits', result: 'Successfully merged 2 playlists', time: '1 day ago' },
            { type: 'Smart Sort', playlist: 'Chill Vibes', result: 'Sorted by energy level (low to high)', time: '3 days ago' },
          ].map((operation, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-spotify-black rounded-lg">
              <div className="w-2 h-2 bg-spotify-green rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{operation.type}</p>
                <p className="text-gray-400 text-xs truncate">{operation.playlist}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-gray-300 text-xs">{operation.result}</p>
                <p className="text-gray-500 text-xs">{operation.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SmartFeatures;
