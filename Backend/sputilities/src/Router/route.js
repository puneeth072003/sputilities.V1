const { getHome, getUser, getArtist } = require("../Controller/tasks");
const { fetchLiked } = require("../Controller/feature 1/fetchLiked");
const { getLogin } = require("../Controller/login");
const { callBac, getAccessToken } = require("../Controller/callback");
const { createPlaylist } = require("../Controller/feature 1/createPlaylist");
const { addSongs } = require("../Controller/feature 1/AddSongs");
const express = require("express");

const router = express.Router();

router.get("/", getHome);
router.get("/login", getLogin);
router.get("/login/callback", callBac);
router.get("/access", getAccessToken);
router.get("/fetch", getUser);
router.get("/artist", getArtist);
router.get("/liked", fetchLiked);
router.post("/playlist", createPlaylist);
router.get("/addsong", addSongs);
module.exports = router;
