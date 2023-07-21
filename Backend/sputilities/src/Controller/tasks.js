const getHome = async (req, res) => {
  res.send("hello-world");
};
const getUser = async (req, res) => {
  console.log(`Access token from fetch==> ${global.access_token}`);
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${global.access_token}` },
  });
  const data = await response.json();
  const name = data.display_name;
  const email = data.email;
  console.log(`${name}============>${email}`);
  await res.send(data);
};

const getArtist = async (req, res) => {
  const data = await fetch(
    `https://api.spotify.com/v1/search?q=JVKE&type=artist&limit=1&offset=0`,
    {
      headers: {
        Authorization: `Bearer ${global.access_token}`,
      },
    }
  );
  const json = await data.json();
  res.send({ json });
};

module.exports = { getHome, getUser, getArtist };
