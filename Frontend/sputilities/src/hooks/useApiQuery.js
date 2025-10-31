import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { handleAPIError } from '../services/api';
import { syncManager } from '../utils/dataManager';

// Enhanced useQuery hook with better error handling and loading states
export const useApiQuery = (queryKey, queryFn, options = {}) => {
  const {
    onSuccess,
    onError,
    showErrorToast = true,
    showSuccessToast = false,
    syncType,
    ...queryOptions
  } = options;

  const query = useQuery({
    queryKey,
    queryFn: async (...args) => {
      try {
        const result = await queryFn(...args);
        
        if (showSuccessToast && onSuccess) {
          onSuccess(result);
        }
        
        return result;
      } catch (error) {
        const errorMessage = handleAPIError(error);
        
        if (showErrorToast) {
          toast.error(errorMessage);
        }
        
        if (onError) {
          onError(error, errorMessage);
        }
        
        throw error;
      }
    },
    ...queryOptions,
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isFetching,
    isEmpty: !query.isLoading && !query.error && (!query.data || (Array.isArray(query.data) && query.data.length === 0)),
  };
};

// Enhanced useMutation hook with optimistic updates and sync
export const useApiMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();
  const {
    onSuccess,
    onError,
    showErrorToast = true,
    showSuccessToast = true,
    successMessage = 'Operation completed successfully',
    syncType,
    optimisticUpdate,
    invalidateQueries = [],
    ...mutationOptions
  } = options;

  const [isOptimistic, setIsOptimistic] = useState(false);

  const mutation = useMutation({
    mutationFn: async (variables) => {
      let rollback = null;
      
      try {
        // Apply optimistic update if provided
        if (optimisticUpdate) {
          setIsOptimistic(true);
          rollback = syncManager.optimisticUpdate(
            optimisticUpdate.queryKey,
            (oldData) => optimisticUpdate.updater(oldData, variables)
          );
        }
        
        const result = await mutationFn(variables);
        
        // Clear optimistic state
        setIsOptimistic(false);
        
        return result;
      } catch (error) {
        // Rollback optimistic update on error
        if (rollback) {
          rollback();
          setIsOptimistic(false);
        }
        
        throw error;
      }
    },
    onSuccess: async (data, variables, context) => {
      try {
        // Invalidate specified queries
        await Promise.all(
          invalidateQueries.map(queryKey => 
            queryClient.invalidateQueries(queryKey)
          )
        );
        
        // Sync related data if syncType is provided
        if (syncType) {
          await syncManager.syncRelatedData(data, syncType);
        }
        
        // Show success toast
        if (showSuccessToast) {
          toast.success(successMessage);
        }
        
        // Call custom onSuccess
        if (onSuccess) {
          onSuccess(data, variables, context);
        }
      } catch (syncError) {
        console.error('Error during post-mutation sync:', syncError);
      }
    },
    onError: (error, variables, context) => {
      const errorMessage = handleAPIError(error);
      
      if (showErrorToast) {
        toast.error(errorMessage);
      }
      
      if (onError) {
        onError(error, variables, context, errorMessage);
      }
    },
    ...mutationOptions,
  });

  return {
    ...mutation,
    isOptimistic,
  };
};

// Hook for paginated data
export const usePaginatedQuery = (queryKey, queryFn, options = {}) => {
  const [page, setPage] = useState(options.initialPage || 1);
  const [pageSize, setPageSize] = useState(options.initialPageSize || 20);

  const query = useApiQuery(
    [...queryKey, { page, pageSize }],
    () => queryFn({ page, pageSize, ...options.params }),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  const nextPage = useCallback(() => {
    if (query.data?.hasNextPage) {
      setPage(prev => prev + 1);
    }
  }, [query.data?.hasNextPage]);

  const previousPage = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const changePageSize = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  }, []);

  return {
    ...query,
    page,
    pageSize,
    nextPage,
    previousPage,
    goToPage,
    changePageSize,
    hasNextPage: query.data?.hasNextPage || false,
    hasPreviousPage: page > 1,
    totalPages: query.data?.totalPages || 0,
    totalItems: query.data?.totalItems || 0,
  };
};

// Hook for infinite scroll data
export const useInfiniteApiQuery = (queryKey, queryFn, options = {}) => {
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => queryFn({ page: pageParam, ...options.params }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage ? pages.length + 1 : undefined;
    },
    ...options,
  });

  const allData = query.data?.pages.flatMap(page => page.data) || [];

  return {
    ...query,
    data: allData,
    isEmpty: !query.isLoading && !query.error && allData.length === 0,
  };
};

// Hook for real-time data with polling
export const useRealtimeQuery = (queryKey, queryFn, options = {}) => {
  const { pollingInterval = 5000, enablePolling = true, ...queryOptions } = options;

  return useApiQuery(queryKey, queryFn, {
    refetchInterval: enablePolling ? pollingInterval : false,
    refetchIntervalInBackground: false,
    ...queryOptions,
  });
};

// Hook for dependent queries
export const useDependentQuery = (queryKey, queryFn, dependency, options = {}) => {
  return useApiQuery(queryKey, queryFn, {
    enabled: !!dependency,
    ...options,
  });
};

export default {
  useApiQuery,
  useApiMutation,
  usePaginatedQuery,
  useInfiniteApiQuery,
  useRealtimeQuery,
  useDependentQuery,
};
