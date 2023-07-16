const getLogin = async (req, res) => {
  try {
    const payLoad = new URLSearchParams({
      client_id: "329dc13668d2474cb41046741fcabee5",
      redirect_uri: "http://localhost:3600/api/v1/login/callback",
      scope:
        "playlist-read-private user-library-read user-read-email user-read-private playlist-modify-public playlist-modify-private",
      response_type: "code",
    }).toString();
    const loginUrl = `https://accounts.spotify.com/authorize?${payLoad}`;
    await res.redirect(loginUrl);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getLogin };
