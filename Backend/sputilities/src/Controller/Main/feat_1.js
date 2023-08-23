const { addSongs } = require("../feature 1/AddSongs");
const { createPlaylist } = require("../feature 1/createPlaylist");
const { getUser } = require("../tasks");
const { getAccessToken } = require("../callback");
const { fetchLiked } = require("../feature 1/fetchLiked");
const path = require("path");
const fs = require("fs");

const getFeat_1 = async (req, res) => {
  try {
    await getAccessToken();
    await getUser();
    await createPlaylist();
    await fetchLiked();
    await addSongs();

    res.status(200).json({ message: "Feature 1 completed successfully." });
  } catch (error) {
    console.error("Error in getFeat_1:", error);
    res.status(500).json({ error: "An error occurred." });
  }
};

module.exports = { getFeat_1 };
