import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useAppStore = create(
  subscribeWithSelector((set, get) => ({
    // UI State
    sidebarOpen: false,
    currentPage: 'dashboard',
    theme: 'dark',
    loading: false,
    notifications: [],

    // Data State
    playlists: [],
    likedSongs: [],
    operations: [],
    analytics: null,

    // Filters and Search
    searchQuery: '',
    filters: {
      playlists: {
        created_via_app: null,
        is_public: null,
        min_tracks: null,
        max_tracks: null,
        sort_by: 'createdAt',
        sort_order: 'desc',
      },
      likedSongs: {
        added_via_app: null,
        source_playlist_id: null,
        sort_by: 'liked_at',
        sort_order: 'desc',
      },
      operations: {
        status: null,
        operation_type: null,
        sort_by: 'createdAt',
        sort_order: 'desc',
      },
    },

    // Pagination
    pagination: {
      playlists: { limit: 20, offset: 0, total: 0 },
      likedSongs: { limit: 20, offset: 0, total: 0 },
      operations: { limit: 20, offset: 0, total: 0 },
    },

    // Selection State
    selectedPlaylists: [],
    selectedTracks: [],
    selectedOperations: [],

    // Modal State
    modals: {
      createPlaylist: false,
      deleteConfirm: false,
      bulkDelete: false,
      trackDetails: false,
      operationDetails: false,
      settings: false,
    },

    // Actions
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setLoading: (loading) => set({ loading }),
    
    // Search and Filters
    setSearchQuery: (query) => set({ searchQuery: query }),
    updateFilter: (category, key, value) => set((state) => ({
      filters: {
        ...state.filters,
        [category]: {
          ...state.filters[category],
          [key]: value,
        },
      },
    })),
    resetFilters: (category) => set((state) => ({
      filters: {
        ...state.filters,
        [category]: {
          created_via_app: null,
          is_public: null,
          min_tracks: null,
          max_tracks: null,
          sort_by: 'createdAt',
          sort_order: 'desc',
        },
      },
    })),

    // Data Management
    setPlaylists: (playlists) => set({ playlists }),
    setLikedSongs: (likedSongs) => set({ likedSongs }),
    setOperations: (operations) => set({ operations }),
    setAnalytics: (analytics) => set({ analytics }),

    // Pagination
    updatePagination: (category, pagination) => set((state) => ({
      pagination: {
        ...state.pagination,
        [category]: { ...state.pagination[category], ...pagination },
      },
    })),

    // Selection Management
    togglePlaylistSelection: (playlistId) => set((state) => ({
      selectedPlaylists: state.selectedPlaylists.includes(playlistId)
        ? state.selectedPlaylists.filter(id => id !== playlistId)
        : [...state.selectedPlaylists, playlistId],
    })),
    selectAllPlaylists: (playlistIds) => set({ selectedPlaylists: playlistIds }),
    clearPlaylistSelection: () => set({ selectedPlaylists: [] }),

    toggleTrackSelection: (trackId) => set((state) => ({
      selectedTracks: state.selectedTracks.includes(trackId)
        ? state.selectedTracks.filter(id => id !== trackId)
        : [...state.selectedTracks, trackId],
    })),
    selectAllTracks: (trackIds) => set({ selectedTracks: trackIds }),
    clearTrackSelection: () => set({ selectedTracks: [] }),

    // Modal Management
    openModal: (modalName) => set((state) => ({
      modals: { ...state.modals, [modalName]: true },
    })),
    closeModal: (modalName) => set((state) => ({
      modals: { ...state.modals, [modalName]: false },
    })),
    closeAllModals: () => set((state) => ({
      modals: Object.keys(state.modals).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
    })),

    // Notifications
    addNotification: (notification) => set((state) => ({
      notifications: [...state.notifications, {
        id: Date.now(),
        timestamp: new Date(),
        ...notification,
      }],
    })),
    removeNotification: (id) => set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id),
    })),
    clearNotifications: () => set({ notifications: [] }),

    // Utility Actions
    reset: () => set({
      playlists: [],
      likedSongs: [],
      operations: [],
      analytics: null,
      selectedPlaylists: [],
      selectedTracks: [],
      selectedOperations: [],
      searchQuery: '',
    }),
  }))
);

export default useAppStore;
