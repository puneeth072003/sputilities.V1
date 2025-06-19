import axios from 'axios';
import toast from 'react-hot-toast';

// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3600/api/v1',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  withCredentials: true,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request queue for managing concurrent requests
const requestQueue = new Map();

// Retry logic for failed requests
const retryRequest = async (config, attempt = 1) => {
  try {
    return await api(config);
  } catch (error) {
    if (attempt < API_CONFIG.retryAttempts && shouldRetry(error)) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay * attempt));
      return retryRequest(config, attempt + 1);
    }
    throw error;
  }
};

// Determine if request should be retried
const shouldRetry = (error) => {
  const retryableStatuses = [408, 429, 500, 502, 503, 504];
  const retryableNetworkErrors = ['ECONNRESET', 'ENOTFOUND', 'ECONNABORTED'];

  return (
    error.response?.status && retryableStatuses.includes(error.response.status) ||
    error.code && retryableNetworkErrors.includes(error.code) ||
    error.message?.includes('timeout')
  );
};

// Request deduplication
const deduplicateRequest = (config) => {
  const key = `${config.method}-${config.url}-${JSON.stringify(config.params)}`;

  if (requestQueue.has(key)) {
    return requestQueue.get(key);
  }

  const request = api(config).finally(() => {
    requestQueue.delete(key);
  });

  requestQueue.set(key, request);
  return request;
};

// Request interceptor for logging, auth, and deduplication
api.interceptors.request.use(
  (config) => {
    // Add request timestamp
    config.metadata = { startTime: Date.now() };

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = Date.now() - response.config.metadata.startTime;

    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.status} ${response.config.url} (${duration}ms)`);
    }

    return response;
  },
  (error) => {
    const duration = error.config?.metadata?.startTime
      ? Date.now() - error.config.metadata.startTime
      : 0;

    console.error(`❌ API Response Error: ${error.response?.status || 'Network'} ${error.config?.url} (${duration}ms)`, error);

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Clear any stored auth data
      localStorage.removeItem('auth-storage');
      // Redirect to login
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (error.response?.status === 403) {
      toast.error('Access denied. Please check your permissions.');
    }

    if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }

    if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    }

    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: () => api.get('/auth/login'),
  check: () => api.get('/auth/check'),
  logout: () => api.post('/auth/logout'),
};

// Playlists API
export const playlistsAPI = {
  getPlaylists: (params = {}) => api.get('/playlists', { params }),
  createPlaylist: (data) => api.post('/playlists', data),
  deletePlaylist: (playlistId) => api.delete(`/playlists/${playlistId}`),
  bulkDelete: (playlistIds) => api.post('/playlists/bulk-delete', { playlistIds }),
  getAnalytics: () => api.get('/playlists/analytics'),
};

// Liked Songs API
export const likedSongsAPI = {
  getLikedSongs: (params = {}) => api.get('/liked-songs', { params }),
  likePlaylist: (playlistId) => api.post(`/liked-songs/like-playlist/${playlistId}`),
  reset: () => api.post('/liked-songs/reset'),
  backup: (data) => api.post('/liked-songs/backup', data),
  getAnalytics: () => api.get('/liked-songs/analytics'),
};

// Operations API
export const operationsAPI = {
  getOperations: (params = {}) => api.get('/operations', { params }),
  getOperation: (operationId) => api.get(`/operations/${operationId}`),
  cancelOperation: (operationId) => api.post(`/operations/${operationId}/cancel`),
};

// Playlist Manager API
export const playlistManagerAPI = {
  getDashboard: () => api.get('/playlist-manager/dashboard'),
  getPlaylists: (params = {}) => api.get('/playlist-manager/playlists', { params }),
  getDeletionPreview: (playlistIds) => api.post('/playlist-manager/deletion-preview', { playlistIds }),
  getDuplicates: () => api.get('/playlist-manager/duplicates'),
};

// Tracks API
export const tracksAPI = {
  search: (params = {}) => api.get('/tracks/search', { params }),
  getAnalytics: (trackId) => api.get(`/tracks/${trackId}/analytics`),
  batchOperations: (data) => api.post('/tracks/batch-operations', data),
  addToPlaylist: (playlistId, data) => api.post(`/playlists/${playlistId}/tracks`, data),
  addAlbumToPlaylist: (playlistId, data) => api.post(`/playlists/${playlistId}/albums`, data),
  removeFromPlaylist: (playlistId, data) => api.delete(`/playlists/${playlistId}/tracks`, { data }),
  reorderTracks: (playlistId, data) => api.put(`/playlists/${playlistId}/tracks/reorder`, data),
  filterPlaylistTracks: (playlistId, params = {}) => api.get(`/playlists/${playlistId}/tracks/filter`, { params }),
  getPlaylistAnalytics: (playlistId) => api.get(`/playlists/${playlistId}/analytics`),
};

// Smart Management API
export const smartAPI = {
  findDuplicates: (playlistId) => api.get(`/smart/playlists/${playlistId}/duplicates`),
  removeDuplicates: (playlistId, data) => api.post(`/smart/playlists/${playlistId}/remove-duplicates`, data),
  comparePlaylists: (data) => api.post('/smart/playlists/compare', data),
  mergePlaylists: (data) => api.post('/smart/playlists/merge', data),
  previewMerge: (data) => api.post('/smart/playlists/merge/preview', data),
  sortPlaylist: (playlistId, data) => api.put(`/smart/playlists/${playlistId}/sort`, data),
  getGenres: () => api.get('/smart/genres'),
};

// Error handling utility
export const handleAPIError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Success response utility
export const getAPIData = (response) => {
  return response.data?.data || response.data;
};

export default api;
