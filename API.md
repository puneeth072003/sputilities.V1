# Spotify Utilities API Documentation

## Base URL
```
http://localhost:3600/api/v1
```

## Authentication

All API endpoints (except auth endpoints) require authentication via session cookies. Users must first authenticate through the Spotify OAuth flow.

### Authentication Flow

1. **Initiate Login**: `GET /auth/login`
2. **Handle Callback**: `GET /auth/callback` (handled automatically)
3. **Check Status**: `GET /auth/check`
4. **Logout**: `POST /auth/logout`

## Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "data": any,
  "message": "string",
  "timestamp": "ISO 8601 string",
  "error_code": "string (only for errors)",
  "details": "any (only for errors)"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `AUTH_REQUIRED` | Authentication required |
| `VALIDATION_ERROR` | Input validation failed |
| `NOT_FOUND` | Resource not found |
| `RATE_LIMIT_EXCEEDED` | Rate limit exceeded |
| `SPOTIFY_API_ERROR` | Spotify API error |
| `INTERNAL_ERROR` | Internal server error |

## Endpoints

### Authentication

#### `GET /auth/login`
Initiate Spotify OAuth login flow.

**Response:**
```json
{
  "success": true,
  "data": {
    "redirectUrl": "https://accounts.spotify.com/authorize?..."
  }
}
```

#### `GET /auth/check`
Check if user is authenticated.

**Response:**
```json
{
  "success": true,
  "data": {
    "authenticated": true,
    "user": {
      "id": "spotify_user_id",
      "name": "User Name"
    }
  }
}
```

#### `POST /auth/logout`
Logout user and clear session.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Playlists

#### `GET /playlists`
Get user's playlists with pagination and filtering.

**Query Parameters:**
- `limit` (number, optional): Number of playlists (1-50, default: 20)
- `offset` (number, optional): Skip number of playlists (default: 0)
- `created_via_app` (boolean, optional): Filter app-created playlists
- `feature` (string, optional): Filter by feature type

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "spotify_id": "playlist_id",
      "name": "Playlist Name",
      "description": "Description",
      "total_tracks": 25,
      "is_public": false,
      "created_via_app": true,
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "count": 15
  }
}
```

#### `POST /playlists`
Create a new playlist.

**Request Body:**
```json
{
  "name": "My New Playlist",
  "description": "Optional description",
  "isPublic": false,
  "metadata": {
    "app_feature": "custom_playlist"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "spotify_id": "new_playlist_id",
    "name": "My New Playlist",
    "description": "Optional description",
    "is_public": false,
    "total_tracks": 0
  }
}
```

#### `DELETE /playlists/:playlistId`
Delete a specific playlist.

**Response:**
```json
{
  "success": true,
  "data": {
    "playlistId": "deleted_playlist_id"
  }
}
```

#### `POST /playlists/bulk-delete`
Delete multiple playlists.

**Request Body:**
```json
{
  "playlistIds": ["playlist1", "playlist2", "playlist3"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "operation_id": "operation_uuid"
  },
  "message": "Bulk deletion started. Check operation status for progress."
}
```

#### `GET /playlists/analytics`
Get playlist analytics for user.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPlaylists": 50,
    "totalTracks": 1250,
    "publicPlaylists": 10,
    "appCreatedPlaylists": 5,
    "averageTracksPerPlaylist": 25
  }
}
```

### Liked Songs

#### `GET /liked-songs`
Get user's liked songs with pagination and filtering.

**Query Parameters:**
- `limit` (number, optional): Number of songs (1-50, default: 20)
- `offset` (number, optional): Skip number of songs (default: 0)
- `added_via_app` (boolean, optional): Filter app-added songs
- `source_playlist_id` (string, optional): Filter by source playlist
- `sort_by` (string, optional): Sort field (liked_at, track_name, etc.)
- `sort_order` (string, optional): Sort order (asc, desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "spotify_track_id": "track_id",
      "track_name": "Song Name",
      "artists": [{"name": "Artist Name"}],
      "album": {
        "name": "Album Name",
        "image_url": "https://..."
      },
      "duration_ms": 180000,
      "liked_at": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

#### `POST /liked-songs/like-playlist/:playlistId`
Like all songs from a specific playlist.

**Response:**
```json
{
  "success": true,
  "data": {
    "operation_id": "operation_uuid"
  },
  "message": "Started liking all songs from playlist."
}
```

#### `POST /liked-songs/reset`
Reset liked library (unlike all songs).

**Response:**
```json
{
  "success": true,
  "data": {
    "operation_id": "operation_uuid"
  },
  "message": "Started resetting liked library."
}
```

#### `POST /liked-songs/backup`
Create backup playlist from liked songs.

**Request Body:**
```json
{
  "playlistName": "My Liked Songs Backup",
  "description": "Backup created on 2023-01-01",
  "isPublic": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "operation_id": "operation_uuid"
  },
  "message": "Started creating backup playlist."
}
```

#### `GET /liked-songs/analytics`
Get liked songs analytics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalLikedSongs": 500,
    "appAddedSongs": 50,
    "totalDuration": 1800000,
    "totalDurationFormatted": "30h 0m",
    "averageDuration": 180000,
    "averageDurationFormatted": "3:00"
  }
}
```

### Operations

#### `GET /operations`
Get user's operations with pagination and filtering.

**Query Parameters:**
- `limit` (number, optional): Number of operations (1-50, default: 20)
- `offset` (number, optional): Skip number of operations (default: 0)
- `status` (string, optional): Filter by status
- `operation_type` (string, optional): Filter by operation type

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "operation_id",
      "operation_type": "like_all_playlist_songs",
      "status": "completed",
      "progress": {
        "total_items": 100,
        "processed_items": 100,
        "percentage": 100
      },
      "createdAt": "2023-01-01T00:00:00.000Z",
      "completed_at": "2023-01-01T00:05:00.000Z"
    }
  ]
}
```

#### `GET /operations/:operationId`
Get specific operation status.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "operation_id",
    "operation_type": "bulk_delete_playlists",
    "status": "in_progress",
    "progress": {
      "total_items": 10,
      "processed_items": 7,
      "percentage": 70
    },
    "result_data": {
      "deleted_playlists": ["playlist1", "playlist2"],
      "errors": []
    }
  }
}
```

#### `POST /operations/:operationId/cancel`
Cancel a pending or in-progress operation.

**Response:**
```json
{
  "success": true,
  "data": {
    "operation_id": "operation_id",
    "status": "cancelled"
  }
}
```

### Playlist Manager

#### `GET /playlist-manager/dashboard`
Get playlist manager dashboard data.

**Response:**
```json
{
  "success": true,
  "data": {
    "playlists": [...],
    "analytics": {
      "playlists": {...},
      "likedSongs": {...}
    },
    "recentOperations": [...],
    "summary": {
      "totalPlaylists": 50,
      "totalLikedSongs": 500,
      "pendingOperations": 2
    }
  }
}
```

#### `GET /playlist-manager/playlists`
Get playlists with advanced filtering and search.

**Query Parameters:**
- `search` (string, optional): Search term
- `sort_by` (string, optional): Sort field
- `sort_order` (string, optional): Sort order (asc, desc)
- `min_tracks` (number, optional): Minimum tracks
- `max_tracks` (number, optional): Maximum tracks
- `is_public` (boolean, optional): Public/private filter

#### `POST /playlist-manager/deletion-preview`
Get preview of playlist deletion with warnings.

**Request Body:**
```json
{
  "playlistIds": ["playlist1", "playlist2"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPlaylists": 2,
    "totalTracks": 50,
    "playlists": [...],
    "warnings": [
      {
        "type": "public_playlists",
        "message": "1 public playlist(s) will be deleted"
      }
    ]
  }
}
```

#### `GET /playlist-manager/duplicates`
Find duplicate playlists by name.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "My Playlist",
      "count": 3,
      "playlists": [...]
    }
  ]
}
```

### Track Management Endpoints

#### `GET /tracks/search`
Search for tracks, artists, albums.

#### `GET /tracks/:trackId/analytics`
Get detailed analytics for a track.

#### `POST /tracks/batch-operations`
Perform batch operations on tracks.

#### `POST /playlists/:playlistId/tracks`
Add tracks to a playlist.

#### `POST /playlists/:playlistId/albums`
Add entire album to a playlist.

#### `DELETE /playlists/:playlistId/tracks`
Remove tracks from a playlist.

#### `PUT /playlists/:playlistId/tracks/reorder`
Reorder tracks in a playlist (drag-and-drop).

#### `GET /playlists/:playlistId/tracks/filter`
Filter playlist tracks by audio features.

#### `GET /playlists/:playlistId/analytics`
Get detailed playlist analytics.

### Smart Management Endpoints

#### `GET /smart/playlists/:playlistId/duplicates`
Find duplicate tracks in a playlist.

#### `POST /smart/playlists/:playlistId/remove-duplicates`
Remove duplicate tracks from a playlist.

#### `POST /smart/playlists/compare`
Compare two playlists.

#### `POST /smart/playlists/merge`
Smart merge multiple playlists.

#### `POST /smart/playlists/merge/preview`
Get preview of playlist merge.

#### `PUT /smart/playlists/:playlistId/sort`
Sort playlist tracks by various criteria.

#### `GET /smart/genres`
Get available genre seeds.

## Rate Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| General API | 100 requests | 15 minutes |
| Authentication | 5 requests | 15 minutes |
| Bulk Operations | 5 requests | 1 hour |
| Spotify API | 30 requests | 1 minute |

## Status Codes

- `200` - Success
- `201` - Created
- `202` - Accepted (async operation started)
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error
- `502` - Bad Gateway (Spotify API error)
