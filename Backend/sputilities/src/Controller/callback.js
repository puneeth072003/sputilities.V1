const callBac = async (req, res) => {
  const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(url);
  // const accessToken = hashParams.get("access_token");
  // console.log(accessToken);
  res.send("Sucess boissszzz..");
};
module.exports = { callBac };
