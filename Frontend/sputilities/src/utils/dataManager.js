import { QueryClient } from '@tanstack/react-query';

// Enhanced Query Client with custom configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Cache time - how long data stays in cache after becoming unused
      cacheTime: 10 * 60 * 1000, // 10 minutes
      // Retry configuration
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error.response?.status >= 400 && error.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch configuration
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Cache management utilities
export const cacheManager = {
  // Invalidate specific queries
  invalidateQueries: (queryKey) => {
    return queryClient.invalidateQueries(queryKey);
  },

  // Remove specific queries from cache
  removeQueries: (queryKey) => {
    return queryClient.removeQueries(queryKey);
  },

  // Set query data manually
  setQueryData: (queryKey, data) => {
    return queryClient.setQueryData(queryKey, data);
  },

  // Get cached query data
  getQueryData: (queryKey) => {
    return queryClient.getQueryData(queryKey);
  },

  // Prefetch data
  prefetchQuery: (queryKey, queryFn, options = {}) => {
    return queryClient.prefetchQuery(queryKey, queryFn, options);
  },

  // Clear all cache
  clear: () => {
    return queryClient.clear();
  },

  // Get cache stats
  getStats: () => {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    
    return {
      totalQueries: queries.length,
      freshQueries: queries.filter(q => q.state.dataUpdatedAt > Date.now() - q.options.staleTime).length,
      staleQueries: queries.filter(q => q.isStale()).length,
      errorQueries: queries.filter(q => q.state.error).length,
      loadingQueries: queries.filter(q => q.state.isFetching).length,
    };
  },
};

// Data synchronization utilities
export const syncManager = {
  // Sync related data when one piece changes
  syncRelatedData: async (updatedData, type) => {
    switch (type) {
      case 'playlist':
        // When a playlist is updated, invalidate related queries
        await Promise.all([
          cacheManager.invalidateQueries(['playlists']),
          cacheManager.invalidateQueries(['dashboard']),
          cacheManager.invalidateQueries(['playlists-analytics']),
        ]);
        break;
        
      case 'liked-songs':
        // When liked songs change, invalidate related queries
        await Promise.all([
          cacheManager.invalidateQueries(['liked-songs']),
          cacheManager.invalidateQueries(['liked-songs-analytics']),
          cacheManager.invalidateQueries(['dashboard']),
        ]);
        break;
        
      case 'operation':
        // When operations change, invalidate operations and dashboard
        await Promise.all([
          cacheManager.invalidateQueries(['operations']),
          cacheManager.invalidateQueries(['dashboard']),
        ]);
        break;
        
      default:
        console.warn(`Unknown sync type: ${type}`);
    }
  },

  // Optimistic updates
  optimisticUpdate: (queryKey, updater) => {
    const previousData = cacheManager.getQueryData(queryKey);
    cacheManager.setQueryData(queryKey, updater);
    
    // Return rollback function
    return () => {
      cacheManager.setQueryData(queryKey, previousData);
    };
  },

  // Batch updates
  batchUpdate: (updates) => {
    queryClient.getQueryCache().batch(() => {
      updates.forEach(({ queryKey, data }) => {
        cacheManager.setQueryData(queryKey, data);
      });
    });
  },
};

// Background sync utilities
export const backgroundSync = {
  // Auto-refresh critical data
  startAutoRefresh: () => {
    const intervals = [];
    
    // Refresh operations every 5 seconds if there are active operations
    const operationsInterval = setInterval(async () => {
      const operationsData = cacheManager.getQueryData(['operations']);
      if (operationsData?.some(op => op.status === 'in_progress')) {
        await cacheManager.invalidateQueries(['operations']);
      }
    }, 5000);
    intervals.push(operationsInterval);
    
    // Refresh dashboard every 30 seconds
    const dashboardInterval = setInterval(() => {
      cacheManager.invalidateQueries(['dashboard']);
    }, 30000);
    intervals.push(dashboardInterval);
    
    // Return cleanup function
    return () => {
      intervals.forEach(clearInterval);
    };
  },

  // Sync when coming back online
  syncOnReconnect: () => {
    const handleOnline = () => {
      console.log('🌐 Back online - syncing data...');
      queryClient.refetchQueries();
    };
    
    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  },

  // Sync when tab becomes visible
  syncOnFocus: () => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ Tab focused - syncing critical data...');
        // Only sync critical data to avoid overwhelming the server
        cacheManager.invalidateQueries(['operations']);
        cacheManager.invalidateQueries(['dashboard']);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  },
};

// Error recovery utilities
export const errorRecovery = {
  // Retry failed queries
  retryFailedQueries: () => {
    const cache = queryClient.getQueryCache();
    const failedQueries = cache.getAll().filter(q => q.state.error);
    
    return Promise.all(
      failedQueries.map(query => query.fetch())
    );
  },

  // Reset error state
  resetErrors: () => {
    const cache = queryClient.getQueryCache();
    cache.getAll().forEach(query => {
      if (query.state.error) {
        query.reset();
      }
    });
  },

  // Handle network errors gracefully
  handleNetworkError: (error) => {
    if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
      console.warn('🔌 Network error detected - enabling offline mode');
      // Could implement offline mode here
      return true;
    }
    return false;
  },
};

// Performance monitoring
export const performanceMonitor = {
  // Monitor query performance
  monitorQueries: () => {
    const cache = queryClient.getQueryCache();
    
    cache.subscribe((event) => {
      if (event.type === 'queryUpdated' && event.query.state.dataUpdatedAt) {
        const duration = Date.now() - event.query.state.dataUpdatedAt;
        
        if (duration > 5000) {
          console.warn(`⚠️ Slow query detected: ${event.query.queryHash} took ${duration}ms`);
        }
      }
    });
  },

  // Get performance metrics
  getMetrics: () => {
    const stats = cacheManager.getStats();
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    
    const avgResponseTime = queries
      .filter(q => q.state.dataUpdatedAt && q.state.dataUpdatedAt > 0)
      .reduce((acc, q) => acc + (q.state.dataUpdatedAt - (q.state.fetchedAt || 0)), 0) / queries.length;
    
    return {
      ...stats,
      avgResponseTime: Math.round(avgResponseTime) || 0,
      cacheHitRate: stats.totalQueries > 0 ? (stats.freshQueries / stats.totalQueries) * 100 : 0,
    };
  },
};

export default {
  queryClient,
  cacheManager,
  syncManager,
  backgroundSync,
  errorRecovery,
  performanceMonitor,
};
