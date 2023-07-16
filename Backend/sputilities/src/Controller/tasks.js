const { fetchAccessToken } = require("./callback");

const getHome = async (req, res) => {
  res.send("hello-world");
  const access_token = await fetchAccessToken();
  console.log(`Access token==> ${access_token}`);
};
module.exports = { getHome };

// const getProfile=(req,res)=>{ }
