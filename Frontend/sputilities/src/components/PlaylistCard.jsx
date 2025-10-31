import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  MoreVertical, 
  Play, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Heart,
  Lock,
  Globe,
  Clock
} from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';

const PlaylistCard = ({ 
  playlist, 
  isSelected, 
  onSelect, 
  onEdit, 
  onDelete, 
  onLikeAll,
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false);

  const formatDuration = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getPlaylistImage = () => {
    if (playlist.images && playlist.images.length > 0) {
      return playlist.images[0].url;
    }
    return null;
  };

  const openInSpotify = () => {
    if (playlist.external_urls?.spotify) {
      window.open(playlist.external_urls.spotify, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={clsx(
        'card hover-lift cursor-pointer transition-all duration-200',
        isSelected && 'ring-2 ring-spotify-green',
        className
      )}
      onClick={() => onSelect && onSelect(playlist.spotify_id)}
    >
      {/* Playlist Image */}
      <div className="relative w-full h-48 bg-gradient-to-br from-spotify-green/20 to-gray-800 rounded-lg mb-4 overflow-hidden">
        {getPlaylistImage() && !imageError ? (
          <img
            src={getPlaylistImage()}
            alt={playlist.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Overlay with play button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openInSpotify();
            }}
            className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Play className="w-6 h-6 text-white ml-1" />
          </button>
        </div>

        {/* Selection checkbox */}
        {onSelect && (
          <div className="absolute top-2 left-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                onSelect(playlist.spotify_id);
              }}
              className="w-4 h-4 text-spotify-green bg-gray-800 border-gray-600 rounded focus:ring-spotify-green focus:ring-2"
            />
          </div>
        )}

        {/* Menu */}
        <div className="absolute top-2 right-2">
          <Menu as="div" className="relative">
            <Menu.Button
              onClick={(e) => e.stopPropagation()}
              className="p-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-white" />
            </Menu.Button>
            
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-spotify-dark border border-gray-700 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openInSpotify();
                        }}
                        className={clsx(
                          'flex items-center space-x-2 w-full px-4 py-2 text-sm text-left',
                          active ? 'bg-gray-700 text-white' : 'text-gray-300'
                        )}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in Spotify</span>
                      </button>
                    )}
                  </Menu.Item>
                  
                  {onLikeAll && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onLikeAll(playlist.spotify_id);
                          }}
                          className={clsx(
                            'flex items-center space-x-2 w-full px-4 py-2 text-sm text-left',
                            active ? 'bg-gray-700 text-white' : 'text-gray-300'
                          )}
                        >
                          <Heart className="w-4 h-4" />
                          <span>Like All Songs</span>
                        </button>
                      )}
                    </Menu.Item>
                  )}
                  
                  {onEdit && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(playlist);
                          }}
                          className={clsx(
                            'flex items-center space-x-2 w-full px-4 py-2 text-sm text-left',
                            active ? 'bg-gray-700 text-white' : 'text-gray-300'
                          )}
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit Playlist</span>
                        </button>
                      )}
                    </Menu.Item>
                  )}
                  
                  {onDelete && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(playlist.spotify_id);
                          }}
                          className={clsx(
                            'flex items-center space-x-2 w-full px-4 py-2 text-sm text-left',
                            active ? 'bg-red-600 text-white' : 'text-red-400'
                          )}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Playlist</span>
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Playlist Info */}
      <div className="space-y-2">
        <h3 className="text-white font-semibold truncate" title={playlist.name}>
          {playlist.name}
        </h3>
        
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>{playlist.total_tracks || 0} songs</span>
          {playlist.duration_ms && (
            <>
              <span>•</span>
              <span>{formatDuration(playlist.duration_ms)}</span>
            </>
          )}
        </div>

        {playlist.description && (
          <p className="text-xs text-gray-500 line-clamp-2" title={playlist.description}>
            {playlist.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {playlist.is_public ? (
              <Globe className="w-3 h-3 text-green-400" title="Public" />
            ) : (
              <Lock className="w-3 h-3 text-gray-400" title="Private" />
            )}
            
            {playlist.created_via_app && (
              <div className="w-2 h-2 bg-spotify-green rounded-full" title="Created via app" />
            )}
          </div>
          
          {playlist.createdAt && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{new Date(playlist.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PlaylistCard;
