const fetchLiked = async (req, res) => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/tracks?limit=50",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${global.access_token}` },
    }
  );
  const data = await response.json();
  let arr = [];
  const likedSongs = data.items.map((song) => {
    const track = song.track;
    const artists = track.artists.map((artist) => {
      return {
        name: artist.name,
        id: artist.id,
      };
    });
    arr.push({
      name: track.name,
      id: track.id,
      image: track.album.images[0]?.url || null,
      artists: artists,
    });
  });
  res.send(arr);
  console.log(`length========>${arr.length}`);
};

module.exports = { fetchLiked };
