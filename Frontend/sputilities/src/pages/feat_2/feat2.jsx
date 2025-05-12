import React, { useState, useEffect } from "react";
import axios from "axios";
import "./feat_2.css"; // Make sure to add the CSS below

const Feat2 = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [selectedSongIds, setSelectedSongIds] = useState([]);
  const [loadingLiked, setLoadingLiked] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [creationMessage, setCreationMessage] = useState("");
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 12;

  // Fetch liked songs from backend endpoint
  const fetchLikedSongs = async () => {
    try {
      setLoadingLiked(true);
      const response = await axios.get("http://localhost:3600/api/v1/feat_2/liked", { withCredentials: true });
      setLikedSongs(response.data);
      setLoadingLiked(false);
    } catch (error) {
      console.error("Error fetching liked songs:", error);
      setLoadingLiked(false);
    }
  };

  // Toggle song selection state
  const toggleSongSelection = (songId) => {
    const trackUri = `spotify:track:${songId}`; // Ensure the correct format
    setSelectedSongIds((prevSelected) =>
      prevSelected.includes(trackUri)
        ? prevSelected.filter((id) => id !== trackUri)
        : [...prevSelected, trackUri]
    );
  };

  // Create playlist and add the selected songs.
  const handleCreatePlaylist = async () => {
    try {
      const createResponse = await axios.post(
        "http://localhost:3600/api/v1/feat_2/create",
        { 
          name: playlistName, 
          description: playlistDescription, 
          public: isPublic, 
          SongIds: selectedSongIds, 
          length: selectedSongIds.length 
        },
        { withCredentials: true }
      );
      setCreationMessage(createResponse.data.message);
    } catch (error) {
      console.error("Error creating playlist:", error);
      const errorMessage = error.response?.data?.error || "Failed to create playlist. Please try again.";
      setCreationMessage(errorMessage);
    }
  };

  useEffect(() => {
    fetchLikedSongs();
  }, []);

  // Pagination: calculate indices
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = likedSongs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(likedSongs.length / songsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="feat2-container">
      <h1>Custom Playlist Creation</h1>
      
      <section>
        <h2>Liked Songs</h2>
        {loadingLiked ? (
          <p>Loading liked songs...</p>
        ) : likedSongs.length === 0 ? (
          <p>No liked songs found.</p>
        ) : (
          <>
            <div className="songs-grid">
              {currentSongs.map((song) => (
                <div key={song.id} className="song-card">
                  {song.image ? (
                    <img src={song.image} alt={song.name} className="song-thumbnail" />
                  ) : (
                    <div className="no-thumbnail">No Image</div>
                  )}
                  <p className="song-name">{song.name}</p>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedSongIds.includes(`spotify:track:${song.id}`)} // Ensure correct comparison
                      onChange={() => toggleSongSelection(song.id)}
                    />
                    Select
                  </label>
                </div>
              ))}
            </div>
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </>
        )}
      </section>

      <section className="playlist-form">
        <h2>Playlist Details</h2>
        <div className="form-group">
          <label>Playlist Name:</label>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
          ></textarea>
        </div>
        <div  style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <label>
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
                Public Playlist
            </label>
        </div>
        <button onClick={handleCreatePlaylist} className="create-btn">
          Create Playlist
        </button>
        {creationMessage && <p className="creation-msg">{creationMessage}</p>}
      </section>
    </div>
  );
};

export default Feat2;