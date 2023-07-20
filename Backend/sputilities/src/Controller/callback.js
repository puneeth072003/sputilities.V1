const CLIENT_ID = "478250b0aa4a4e6ca9ed489145cebd6a";
const CLIENT_SECRET = "b66f699c2af041cdaa6c67e1315882cb";
const callBac = async (req, res) => {
  const code = req.query.code;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3600/api/v1/login/callback",
    }).toString(),
  });

  const data = await response.json();
  global.access_token = data.access_token;
  global.refresh_token = data.refresh_token;
  console.log(`Access token from callback ==> ${global.access_token}`);
  console.log(`Refresh token from callback ==> ${global.refresh_token}`);
  res.send("Success boissszzz..");
};
const getAccessToken = async (req, res) => {
  const refresh_token = global.refresh_token;
  if (!CLIENT_ID || !CLIENT_SECRET || !refresh_token) {
    console.error(
      "Sputilities/Error: The environment variables are missing bro so better login first."
    );
  }
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
  });
  const data = await response.json();
  global.access_token = await data.access_token;
  console.log(`New access token ====> ${global.access_token}`);
};
module.exports = { callBac, getAccessToken };
