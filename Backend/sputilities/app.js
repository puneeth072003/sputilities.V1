const express = require("express");
const cors = require("cors");

const app = express();
const router = require("./src/Router/route");

const corsOptions = {
  "Access-Control-Allow-Origin": "http:localhost:3600",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("../../Frontend/sputilities/dist"));
// Remove this later
app.use("/api/v1/", router);

app.listen(3600, () => {
  console.log("Server listening to port 3600, ENJOY");
});
