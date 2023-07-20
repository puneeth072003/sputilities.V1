const {
  getHome,
  getUser,
  getArtist,
  getLiked,
} = require("../Controller/tasks");
const { getLogin } = require("../Controller/login");
const { callBac, getAccessToken } = require("../Controller/callback");

const express = require("express");
const router = express.Router();

router.get("/", getHome);
router.get("/login", getLogin);
router.get("/login/callback", callBac);
router.get("/access", getAccessToken);
router.get("/fetch", getUser);
router.get("/artist", getArtist);
router.get("/liked", getLiked);
module.exports = router;
