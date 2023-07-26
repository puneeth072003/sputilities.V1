const express = require("express");
const cors = require("cors");

const app = express();
const router = require("./src/Router/route");

app.use(cors());
app.use(express.json());

// Remove this later
app.use("/api/v1/", router);

app.listen(3600, () => {
  console.log("Server listening to port 3600, ENJOY");
});
