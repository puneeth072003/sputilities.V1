const fetchLiked = async (req, res) => {
  let offset = 0;
  global.LikedIds = [];
  let allLikedSongs = [];
  const fetchTracks = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const data = await response.json();
    return data;
  };
  while (true) {
    const data = await fetchTracks(offset);
    if (data.items.length === 0) {
      break;
    }
    allLikedSongs.push(...processLikedSongs(data));
    offset += 50;
  }
  await console.log(`ID array========>${global.LikedIds.length}`);
  global.length = global.LikedIds.length;
  console.log(`length========>${allLikedSongs.length}`);
  // res.send(allLikedSongs);
};
const processLikedSongs = (data) => {
  getIds(data);
  return data.items.map((song) => {
    const track = song.track;
    const artists = track.artists.map((artist) => {
      return {
        name: artist.name,
        id: artist.id,
      };
    });

    return {
      name: track.name,
      id: track.id,
      image: track.album.images[0]?.url || null,
      artists: artists,
    };
  });
};
const getIds = async (data) => {
  data.items.map((song) => {
    const track = song.track;
    global.LikedIds.push(`spotify:track:${track.id}`);
  });
};
// const fetchLiked=async(req,res)=>{
//   let offset = 0;
//   let allLikedSongs = [];
//   const limit=50;
//   const fetchTracks = async (offset) => {
//     try {
//     const response = await fetch(
//       `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${global.access_token}` },
//       }
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching liked songs:", error);
//     throw error; // Throw the error to handle it in the fetchLiked function
//   }
// };
//   try {
//     let firstData =await fetchTracks(offset)
//     let totalLikedSongs=firstData.total;
//     let totalPages=Math.ceil(totalLikedSongs/limit)
//     let promises = [processLikedSongs(firstData)];

//     for (let page = 1; page < totalPages; page++) {
//       offset += limit;
//       promises.push(fetchTracks(offset));
//     }

//     // Wait for all promises to resolve
//     let responses = await Promise.all(promises);

//     // Process all liked songs
//     responses.forEach((data) => {
//       allLikedSongs.push(...processLikedSongs(data));
//     });

//     console.log(`length========>${allLikedSongs.length}`);
//     res.send(allLikedSongs);
//   } catch (error) {
//     console.error("Error fetching liked songs:", error);
//     res.status(500).json({ error: "Failed to fetch liked songs" });
//   }
// };

module.exports = { fetchLiked };
