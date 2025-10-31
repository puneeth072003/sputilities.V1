import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authAPI, handleAPIError } from '../services/api';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    clearError,
    setUser,
    setAuthenticated,
    setLoading,
    setError 
  } = useAuthStore();

  // Query to check authentication status
  const { data: authData, isLoading: isCheckingAuth } = useQuery({
    queryKey: ['auth', 'check'],
    queryFn: async () => {
      try {
        const response = await authAPI.check();
        // Handle legacy boolean response format
        const isAuthenticated = response.data === true;
        return { authenticated: isAuthenticated, user: null };
      } catch (error) {
        console.error('Auth check failed:', error);
        return { authenticated: false, user: null };
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    onSuccess: (data) => {
      if (data?.authenticated) {
        useAuthStore.getState().setUser(data.user);
        useAuthStore.getState().setAuthenticated(true);
      } else {
        useAuthStore.getState().setUser(null);
        useAuthStore.getState().setAuthenticated(false);
      }
    },
    onError: (error) => {
      console.error('Auth check failed:', error);
      useAuthStore.getState().setUser(null);
      useAuthStore.getState().setAuthenticated(false);
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (response) => {
      try {
        // Handle both new API format and legacy format
        let redirectUrl;
        if (response.data?.data?.redirectUrl) {
          redirectUrl = response.data.data.redirectUrl;
        } else if (response.data?.redirectUrl) {
          redirectUrl = response.data.redirectUrl;
        } else {
          throw new Error('No redirect URL found in response');
        }
        window.location.href = redirectUrl;
      } catch (error) {
        console.error('Login response error:', error);
        toast.error('Failed to get login URL');
        useAuthStore.getState().setError('Failed to get login URL');
      }
    },
    onError: (error) => {
      const errorMessage = handleAPIError(error);
      toast.error(errorMessage);
      useAuthStore.getState().setError(errorMessage);
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      useAuthStore.getState().setUser(null);
      useAuthStore.getState().setAuthenticated(false);
      queryClient.clear();
      toast.success('Logged out successfully');
    },
    onError: (error) => {
      const errorMessage = handleAPIError(error);
      toast.error(errorMessage);
      // Still clear auth state even if logout fails
      useAuthStore.getState().setUser(null);
      useAuthStore.getState().setAuthenticated(false);
      queryClient.clear();
    }
  });

  const login = () => {
    clearError();
    loginMutation.mutate();
  };

  const logout = () => {
    clearError();
    logoutMutation.mutate();
  };

  const refetchAuth = () => {
    queryClient.invalidateQueries(['auth', 'check']);
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading: isLoading || isCheckingAuth || loginMutation.isPending || logoutMutation.isPending,
    error,
    
    // Actions
    login,
    logout,
    refetchAuth,
    clearError,
    
    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
};

export default useAuth;
