import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  RefreshCw,
  Filter,
  Search,
  Eye,
  X,
  AlertCircle,
  Play,
  Square
} from 'lucide-react';
import { operationsAPI } from '../services/api';
import useAppStore from '../store/appStore';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Operations = () => {
  const queryClient = useQueryClient();
  const { searchQuery, setSearchQuery, filters, updateFilter } = useAppStore();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch operations
  const { data: operationsData, isLoading, error } = useQuery({
    queryKey: ['operations', {
      search: searchQuery,
      ...filters.operations
    }],
    queryFn: async () => {
      const params = {
        search: searchQuery || undefined,
        ...filters.operations,
        limit: 50
      };

      // Remove null/undefined values
      Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === undefined || params[key] === '') {
          delete params[key];
        }
      });

      const response = await operationsAPI.getOperations(params);
      return response.data.data;
    },
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: autoRefresh ? 5000 : false, // Auto-refresh every 5 seconds
  });

  // Cancel operation mutation
  const cancelOperationMutation = useMutation({
    mutationFn: (operationId) => operationsAPI.cancelOperation(operationId),
    onSuccess: () => {
      queryClient.invalidateQueries(['operations']);
      toast.success('Operation cancelled successfully');
    },
    onError: (error) => {
      toast.error('Failed to cancel operation');
      console.error('Cancel operation error:', error);
    }
  });

  const operations = operationsData || [];

  // Auto-refresh effect
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        queryClient.invalidateQueries(['operations']);
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, queryClient]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in_progress':
        return <Activity className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'cancelled':
        return <X className="w-5 h-5 text-gray-400" />;
      default:
        return <Pause className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in_progress':
        return 'text-blue-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      case 'cancelled':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getProgressBarColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-400';
      case 'in_progress':
        return 'bg-blue-400';
      case 'failed':
        return 'bg-red-400';
      case 'cancelled':
        return 'bg-gray-400';
      default:
        return 'bg-gray-600';
    }
  };

  const handleCancelOperation = (operationId) => {
    if (confirm('Are you sure you want to cancel this operation?')) {
      cancelOperationMutation.mutate(operationId);
    }
  };

  const handleViewDetails = async (operationId) => {
    try {
      const response = await operationsAPI.getOperation(operationId);
      setSelectedOperation(response.data.data);
    } catch (error) {
      toast.error('Failed to load operation details');
      console.error('Load operation details error:', error);
    }
  };

  const formatOperationType = (type) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getOperationDescription = (operation) => {
    const metadata = operation.metadata || {};
    switch (operation.operation_type) {
      case 'like_all_playlist_songs':
        return `Like all songs from "${metadata.playlist_name || 'playlist'}"`;
      case 'bulk_delete_playlists':
        return `Delete ${metadata.playlist_count || 'multiple'} playlists`;
      case 'backup_liked_songs':
        return `Backup liked songs to "${metadata.backup_playlist_name || 'backup playlist'}"`;
      case 'reset_liked_songs':
        return 'Remove all liked songs';
      case 'remove_duplicates':
        return `Remove duplicates from "${metadata.playlist_name || 'playlist'}"`;
      default:
        return formatOperationType(operation.operation_type);
    }
  };

  // Calculate stats
  const stats = {
    total: operations.length,
    inProgress: operations.filter(op => op.status === 'in_progress').length,
    completed: operations.filter(op => op.status === 'completed').length,
    failed: operations.filter(op => op.status === 'failed').length,
    pending: operations.filter(op => op.status === 'pending').length,
    cancelled: operations.filter(op => op.status === 'cancelled').length,
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
            <h1 className="text-3xl font-bold text-white mb-2">Operations</h1>
            <p className="text-gray-400">
              Track and manage your background operations • {operations.length} operations
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`btn-secondary flex items-center space-x-2 ${autoRefresh ? 'bg-spotify-green text-white' : ''}`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>Auto Refresh</span>
            </button>

            <button
              onClick={() => queryClient.invalidateQueries(['operations'])}
              className="btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6"
      >
        {[
          { label: 'Total', value: stats.total, color: 'text-blue-400' },
          { label: 'In Progress', value: stats.inProgress, color: 'text-yellow-400' },
          { label: 'Completed', value: stats.completed, color: 'text-green-400' },
          { label: 'Failed', value: stats.failed, color: 'text-red-400' },
          { label: 'Pending', value: stats.pending, color: 'text-gray-400' },
          { label: 'Cancelled', value: stats.cancelled, color: 'text-gray-500' },
        ].map((stat, index) => (
          <div key={stat.label} className="card">
            <p className="text-gray-400 text-xs">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
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
                placeholder="Search operations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-spotify-green text-white' : ''}`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Status</label>
                    <select
                      value={filters.operations.status || ''}
                      onChange={(e) => updateFilter('operations', 'status', e.target.value || null)}
                      className="input-field w-full"
                    >
                      <option value="">All</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Operation Type</label>
                    <select
                      value={filters.operations.operation_type || ''}
                      onChange={(e) => updateFilter('operations', 'operation_type', e.target.value || null)}
                      className="input-field w-full"
                    >
                      <option value="">All Types</option>
                      <option value="like_all_playlist_songs">Like All Songs</option>
                      <option value="bulk_delete_playlists">Bulk Delete Playlists</option>
                      <option value="backup_liked_songs">Backup Liked Songs</option>
                      <option value="reset_liked_songs">Reset Liked Songs</option>
                      <option value="remove_duplicates">Remove Duplicates</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="large" text="Loading operations..." />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="card text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Failed to load operations</h3>
          <p className="text-gray-400 mb-6">There was an error loading your operations</p>
          <button
            onClick={() => queryClient.invalidateQueries(['operations'])}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && operations.length === 0 && (
        <div className="card text-center py-12">
          <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No operations found</h3>
          <p className="text-gray-400">
            {searchQuery ? 'Try adjusting your search or filters' : 'Your operations will appear here when you start using the app'}
          </p>
        </div>
      )}

      {/* Operations List */}
      {!isLoading && !error && operations.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-xl font-bold text-white mb-4">
            Operations ({operations.length})
          </h2>
          <div className="space-y-3">
            {operations.map((operation, index) => (
              <motion.div
                key={operation._id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-spotify-black rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(operation.status)}
                    <div className="flex-1">
                      <h3 className="text-white font-medium">
                        {getOperationDescription(operation)}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {formatOperationType(operation.operation_type)} •
                        Started {new Date(operation.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium capitalize ${getStatusColor(operation.status)}`}>
                      {operation.status.replace('_', ' ')}
                    </span>

                    <button
                      onClick={() => handleViewDetails(operation._id)}
                      className="p-1 rounded hover:bg-gray-700 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>

                    {operation.status === 'in_progress' && (
                      <button
                        onClick={() => handleCancelOperation(operation._id)}
                        disabled={cancelOperationMutation.isPending}
                        className="p-1 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                        title="Cancel Operation"
                      >
                        <Square className="w-4 h-4 text-red-400" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${operation.progress?.percentage || 0}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-2 rounded-full ${getProgressBarColor(operation.status)}`}
                  />
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">
                    {operation.progress?.percentage || 0}% complete
                    {operation.progress?.current && operation.progress?.total && (
                      <span> • {operation.progress.current}/{operation.progress.total}</span>
                    )}
                  </span>

                  {operation.status === 'completed' && operation.completedAt && (
                    <span className="text-gray-500">
                      Completed {new Date(operation.completedAt).toLocaleString()}
                    </span>
                  )}

                  {operation.status === 'failed' && operation.error && (
                    <span className="text-red-400" title={operation.error}>
                      Error: {operation.error.substring(0, 50)}...
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Operation Details Modal */}
      <AnimatePresence>
        {selectedOperation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedOperation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-spotify-dark rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Operation Details</h3>
                <button
                  onClick={() => setSelectedOperation(null)}
                  className="p-1 rounded hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Type</label>
                  <p className="text-white">{formatOperationType(selectedOperation.operation_type)}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <p className={`capitalize ${getStatusColor(selectedOperation.status)}`}>
                    {selectedOperation.status.replace('_', ' ')}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Progress</label>
                  <p className="text-white">{selectedOperation.progress?.percentage || 0}%</p>
                </div>

                {selectedOperation.metadata && (
                  <div>
                    <label className="text-sm text-gray-400">Details</label>
                    <pre className="text-white text-sm bg-spotify-black p-3 rounded mt-1 overflow-x-auto">
                      {JSON.stringify(selectedOperation.metadata, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedOperation.error && (
                  <div>
                    <label className="text-sm text-gray-400">Error</label>
                    <p className="text-red-400 text-sm">{selectedOperation.error}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Operations;
