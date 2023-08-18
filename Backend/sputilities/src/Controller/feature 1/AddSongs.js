const { response } = require("express");

const addSongs = async (req, res) => {
  const url = `https://api.spotify.com/v1/playlists/${global.playlist_id}/tracks`;
  const batchSize = 100;
  const tracksToAdd = global.LikedIds;
  const totalSize = global.length;
  for (let offset = 0; offset < totalSize; offset += batchSize) {
    const batchTracks = tracksToAdd.slice(offset, offset + batchSize);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${global.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: batchTracks,
        position: offset,
      }),
    });
    // const data = response.json();
    // res.send(data);
  }
};

module.exports = { addSongs };
