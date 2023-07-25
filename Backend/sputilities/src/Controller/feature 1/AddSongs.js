const addSongs = async (req, res) => {
  const url = `https://api.spotify.com/v1/playlists/${global.playlist_id}/tracks`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${global.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: global.LikedIds,
      position: 0,
    }),
  });
  res.send("Songs added");
};

module.exports = { addSongs };
