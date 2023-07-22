const createPlaylist = async (req, res) => {
  const url = `https://api.spotify.com/v1/users/${global.id}/playlists`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${global.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${global.name}'s awesome Playlist`,
      description: `Collection of all the liked songs of ${global.name}'s account`,
      public: true,
    }),
  });
  const data = await response.json();
  res.send(data);
  return data;
};
module.exports = { createPlaylist };
