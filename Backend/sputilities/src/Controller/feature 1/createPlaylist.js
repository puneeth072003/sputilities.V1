const createPlaylist = async (req, res) => {
  const url = `https://api.spotify.com/v1/users/${global.id}/playlists`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${global.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // name: req.body.name,
      name: `${global.name}'s Liked`,
      description: `Collection of all the liked songs`,
      public: true,
    }),
  });
  const data = await response.json();
  // res.send(data);
  //
  global.playlist_id = data.id;
  console.log(`PLAYLIST ID ========>${global.playlist_id}`);
};

module.exports = { createPlaylist };
