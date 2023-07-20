const { fetchAccessToken } = require("./callback");

const getLogin = async (req, res) => {
  try {
    const payLoad = new URLSearchParams({
      client_id: "478250b0aa4a4e6ca9ed489145cebd6a",
      redirect_uri: "http://localhost:3600/api/v1/login/callback",
      scope:
        "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-follow-read user-follow-modify user-top-read user-read-recently-played",
      response_type: "code",
      accept: "application/json",
    }).toString();
    const loginUrl = `https://accounts.spotify.com/authorize?${payLoad}`;
    await res.redirect(loginUrl);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getLogin };
