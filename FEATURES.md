# Spotify Utilities Features Guide

## 🎵 Core Features

### 1. Create / Delete Playlists

**What it does:** Complete playlist lifecycle management with advanced options.

**Features:**
- Create new playlists with custom metadata
- Delete individual or multiple playlists
- Bulk playlist operations with preview
- Playlist ownership verification

**API Endpoints:**
- `POST /api/v1/playlists` - Create playlist
- `DELETE /api/v1/playlists/:playlistId` - Delete playlist
- `POST /api/v1/playlists/bulk-delete` - Bulk delete

**Use Cases:**
- Organize music collections
- Clean up old or unused playlists
- Create themed playlists for different occasions

---

### 2. Add / Remove Tracks

**What it does:** Comprehensive track management for playlists.

**Features:**
- Add individual tracks by ID
- Add entire albums at once
- Remove selected tracks
- Insert tracks at specific positions
- Batch track operations

**API Endpoints:**
- `POST /api/v1/playlists/:playlistId/tracks` - Add tracks
- `POST /api/v1/playlists/:playlistId/albums` - Add album
- `DELETE /api/v1/playlists/:playlistId/tracks` - Remove tracks
- `POST /api/v1/tracks/batch-operations` - Batch operations

**Use Cases:**
- Build playlists from favorite albums
- Remove unwanted tracks quickly
- Organize playlist content efficiently

---

### 3. Search and Filter

**What it does:** Advanced search and filtering capabilities for music discovery.

**Features:**
- Search tracks, artists, albums, playlists
- Filter by audio features (tempo, energy, mood)
- Filter by metadata (genre, popularity, release date)
- Advanced filtering combinations

**API Endpoints:**
- `GET /api/v1/tracks/search` - Search music
- `GET /api/v1/playlists/:playlistId/tracks/filter` - Filter playlist tracks
- `GET /api/v1/smart/genres` - Get available genres

**Filter Options:**
- **Genre:** Filter by music genre
- **Tempo:** BPM range filtering
- **Energy:** Energy level (0.0-1.0)
- **Danceability:** How suitable for dancing (0.0-1.0)
- **Valence:** Musical positivity/mood (0.0-1.0)
- **Popularity:** Spotify popularity score (0-100)
- **Release Date:** Filter by year or date range

**Use Cases:**
- Discover new music matching your taste
- Create mood-specific playlists
- Find high-energy workout songs
- Filter out explicit content

---

### 4. Drag-and-Drop Reordering

**What it does:** Intuitive track reordering within playlists.

**Features:**
- Move single or multiple tracks
- Precise position control
- Maintain playlist flow
- Undo/redo support

**API Endpoint:**
- `PUT /api/v1/playlists/:playlistId/tracks/reorder` - Reorder tracks

**Parameters:**
- `rangeStart`: Starting position of tracks to move
- `insertBefore`: Position to insert tracks
- `rangeLength`: Number of tracks to move

**Use Cases:**
- Perfect playlist flow and transitions
- Group similar songs together
- Move favorites to the top
- Create narrative song sequences

---

### 5. Multi-Select Actions

**What it does:** Batch operations on multiple tracks for efficiency.

**Features:**
- Select multiple tracks across playlists
- Batch move between playlists
- Bulk remove operations
- Mass reordering

**API Endpoint:**
- `POST /api/v1/tracks/batch-operations` - Batch track operations

**Operation Types:**
- `add_tracks`: Add tracks to playlist
- `remove_tracks`: Remove tracks from playlist
- `move_tracks`: Move tracks between playlists
- `reorder_tracks`: Reorder multiple track ranges

**Use Cases:**
- Reorganize large playlists efficiently
- Move songs between themed playlists
- Clean up multiple playlists at once
- Duplicate favorite songs across playlists

---

## 🔍 Smart Management

### 1. Duplicate Song Detection

**What it does:** Intelligently identifies and manages duplicate tracks within playlists.

**Features:**
- Find exact track duplicates by Spotify ID
- Show duplicate positions and add dates
- Preview duplicate removal impact
- Choose which duplicates to keep

**API Endpoints:**
- `GET /api/v1/smart/playlists/:playlistId/duplicates` - Find duplicates
- `POST /api/v1/smart/playlists/:playlistId/remove-duplicates` - Remove duplicates

**Detection Criteria:**
- Exact Spotify track ID matches
- Same song, different versions (optional)
- Cross-playlist duplicate detection

**Use Cases:**
- Clean up accidentally added duplicates
- Maintain playlist quality
- Optimize playlist length
- Remove redundant content

---

### 2. Track Analytics

**What it does:** Provides comprehensive analytics and insights for individual tracks.

**Features:**
- Basic track information (duration, popularity, release date)
- Audio features analysis (tempo, energy, mood)
- Estimated play counts
- Genre and mood classification

**API Endpoint:**
- `GET /api/v1/tracks/:trackId/analytics` - Get track analytics

**Analytics Provided:**
- **Duration:** Track length in various formats
- **Popularity:** Spotify popularity score (0-100)
- **Audio Features:** Tempo, energy, danceability, valence, etc.
- **Mood Analysis:** Happy, energetic, calm, sad classifications
- **Release Information:** Date, year, album details
- **Play Count Estimates:** Based on popularity metrics

**Use Cases:**
- Understand track characteristics
- Make informed playlist decisions
- Analyze music preferences
- Discover similar tracks

---

### 3. Sort Options

**What it does:** Advanced sorting capabilities for playlist organization.

**Features:**
- Multiple sort criteria
- Primary and secondary sorting
- Audio feature-based sorting
- Custom ranking support

**API Endpoint:**
- `PUT /api/v1/smart/playlists/:playlistId/sort` - Sort playlist

**Sort Options:**
- **Name:** Alphabetical by track name
- **Artist:** Alphabetical by artist name
- **Album:** Alphabetical by album name
- **Release Date:** Chronological ordering
- **Duration:** By track length
- **Popularity:** By Spotify popularity score
- **Tempo:** By BPM (beats per minute)
- **Energy:** By energy level
- **Danceability:** By dance suitability
- **Valence:** By mood/positivity
- **Added Date:** By when added to playlist
- **Custom:** User-defined ranking

**Use Cases:**
- Create perfect playlist flow
- Organize by energy levels
- Chronological music journeys
- Alphabetical organization

---

### 4. Playlist Comparison

**What it does:** Analyzes similarities and differences between playlists.

**Features:**
- Find common tracks between playlists
- Identify unique tracks in each playlist
- Calculate similarity percentages
- Audio feature comparison
- Detailed comparison reports

**API Endpoint:**
- `POST /api/v1/smart/playlists/compare` - Compare playlists

**Comparison Metrics:**
- **Common Tracks:** Songs present in both playlists
- **Unique Tracks:** Songs only in one playlist
- **Similarity Percentage:** Overall playlist similarity
- **Overlap Percentage:** How much playlists overlap
- **Audio Feature Comparison:** Average tempo, energy, mood differences

**Use Cases:**
- Merge similar playlists
- Find playlist redundancies
- Analyze music taste evolution
- Discover missing favorites

---

### 5. Smart Merge

**What it does:** Intelligently combines multiple playlists with advanced options.

**Features:**
- Merge multiple playlists at once
- Automatic duplicate removal
- Multiple merge strategies
- Post-merge sorting options
- Merge preview with statistics

**API Endpoints:**
- `POST /api/v1/smart/playlists/merge` - Smart merge playlists
- `POST /api/v1/smart/playlists/merge/preview` - Preview merge

**Merge Strategies:**
- **Simple:** Basic combination of all tracks
- **Smart:** Remove duplicates, optimize flow, sort by popularity
- **Chronological:** Sort by release date
- **Alphabetical:** Sort alphabetically
- **Preserve Order:** Maintain original playlist order
- **Energy Flow:** Sort by energy levels for optimal flow

**Merge Options:**
- Remove duplicates automatically
- Sort after merge
- Custom playlist naming
- Public/private settings
- Description generation

**Use Cases:**
- Consolidate similar playlists
- Create comprehensive collections
- Merge collaborative playlists
- Combine themed playlists

---

### 6. Like All Songs from a Playlist

**What it does:** Instantly adds all songs from any playlist to your liked songs library.

**How to use:**
1. Navigate to the playlist you want to like all songs from
2. Click "Like All Songs" button
3. Confirm the action
4. Monitor progress in the operations panel

**API Endpoint:** `POST /api/v1/liked-songs/like-playlist/:playlistId`

**Use Cases:**
- Quickly add songs from a friend's playlist to your library
- Backup playlist songs to your liked songs before deleting the playlist
- Discover new music by liking songs from curated playlists

**Technical Details:**
- Processes songs in batches of 50 to respect Spotify API limits
- Automatically handles rate limiting and retries
- Creates operation record to track progress
- Updates local database with liked song metadata

---

### 7. Manage Your Liked Songs

**What it does:** Provides comprehensive management tools for your liked songs library.

**Features:**
- View all liked songs with pagination
- Filter by source (app-added vs manually liked)
- Sort by various criteria (date liked, song name, artist, etc.)
- Search through your liked songs
- View detailed analytics

**API Endpoints:**
- `GET /api/v1/liked-songs` - Get liked songs
- `GET /api/v1/liked-songs/analytics` - Get analytics
- `POST /api/v1/liked-songs/sync` - Sync with Spotify

**Analytics Provided:**
- Total number of liked songs
- Songs added via the app vs manually
- Total listening time
- Average song duration
- Most liked artists/albums

---

### 8. Reset Liked Library

**What it does:** Removes ALL songs from your liked songs library.

**How to use:**
1. Navigate to Liked Songs management
2. Click "Reset Library" button
3. **IMPORTANT:** Confirm the action (this cannot be undone)
4. Monitor progress in operations panel

**API Endpoint:** `POST /api/v1/liked-songs/reset`

**Safety Features:**
- Requires explicit confirmation
- Shows preview of how many songs will be removed
- Creates backup option before reset
- Tracks operation progress
- Provides detailed logging

**Use Cases:**
- Clean slate for music discovery
- Remove accidentally bulk-liked songs
- Start fresh with curated music taste

---

## 🔧 Essential Features

### Operation Tracking

**What it does:** Monitors and tracks all long-running operations.

**Features:**
- Real-time progress updates
- Operation history
- Error tracking and reporting
- Cancellation support
- Detailed results and statistics

**Operation Types:**
- `like_all_playlist_songs`
- `unlike_all_songs`
- `bulk_delete_playlists`
- `backup_liked_songs`
- `sync_liked_songs`
- `smart_merge`
- `remove_duplicates`
- `sort_playlist`
- `batch_track_operations`

**API Endpoints:**
- `GET /api/v1/operations` - List operations
- `GET /api/v1/operations/:id` - Get operation status
- `POST /api/v1/operations/:id/cancel` - Cancel operation

### Backup and Restore

**What it does:** Creates backup playlists from your liked songs.

**Features:**
- Create timestamped backup playlists
- Automatic backup before major operations
- Custom backup naming and descriptions
- Public/private backup options

**API Endpoint:** `POST /api/v1/liked-songs/backup`

### Analytics and Insights

**What it does:** Provides detailed statistics about your music library.

**Playlist Analytics:**
- Total playlists and tracks
- Public vs private distribution
- App-created vs manual playlists
- Average tracks per playlist
- Audio feature distributions
- Genre breakdowns
- Decade analysis

**Liked Songs Analytics:**
- Total liked songs and duration
- App-added vs manual likes
- Listening time statistics
- Growth over time
- Mood and energy analysis

### Sync and Data Management

**What it does:** Keeps local data synchronized with Spotify.

**Features:**
- Automatic sync on login
- Manual sync triggers
- Conflict resolution
- Data cleanup tools

**API Endpoints:**
- `POST /api/v1/playlists/sync` - Sync playlists
- `POST /api/v1/liked-songs/sync` - Sync liked songs

---

## 🚀 Advanced Use Cases

### Music Discovery Workflow
1. Use search and filter to find interesting tracks
2. Add tracks to themed playlists
3. Use track analytics to understand preferences
4. Apply smart sorting for optimal flow
5. Use playlist comparison to find gaps

### Library Maintenance
1. Use duplicate detection to clean up playlists
2. Apply smart merge to consolidate similar playlists
3. Use analytics to identify unused playlists
4. Create backups before major changes
5. Monitor operations for completion

### Playlist Optimization
1. Use audio feature filtering to maintain mood
2. Apply smart sorting for energy flow
3. Remove duplicates for cleaner playlists
4. Use track analytics for informed decisions
5. Compare playlists to avoid redundancy

### Bulk Operations
1. Filter playlists by criteria
2. Preview operations with warnings
3. Execute bulk operations with tracking
4. Monitor progress and handle errors
5. Review results and statistics

---

## 📱 Integration Tips

### Frontend Integration
- Use operation IDs to track long-running processes
- Implement real-time progress updates
- Provide clear user feedback and confirmations
- Handle errors gracefully with retry options
- Cache frequently accessed data

### API Best Practices
- Always check operation status for async operations
- Implement proper error handling
- Use pagination for large datasets
- Respect rate limits and handle 429 responses
- Use batch operations for efficiency

### Performance Optimization
- Use filtering and pagination to reduce data transfer
- Cache audio features for frequently accessed tracks
- Implement lazy loading for large playlists
- Use smart merge strategies for optimal results
- Monitor operation performance and optimize accordingly
