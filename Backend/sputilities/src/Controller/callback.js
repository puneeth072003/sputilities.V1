const { access } = require("fs");

const callBac = async (req, res) => {
  fetchAccessToken();
  res.send("Success boissszzz..");
};
const fetchAccessToken = async (req, res) => {
  const client_id = "329dc13668d2474cb41046741fcabee5";
  const client_secret = "ac0b3267b09b4dc386bd8f695d0419c3";
  const payLoad = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }).toString(),
  };
  try {
    const response = await fetch(payLoad.url, payLoad);
    const data = await response.json();

    access_token = data.access_token;
    return access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};
module.exports = { callBac, fetchAccessToken };
