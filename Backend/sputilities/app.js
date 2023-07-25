const express = require("express");
const app = express();
const router = require("./src/Router/route");

app.use(express.json());
// Remove this later
app.use("/api/v1/", router);

app.listen(3600, () => {
  console.log("Server listening to port 3600, ENJOY");
});
