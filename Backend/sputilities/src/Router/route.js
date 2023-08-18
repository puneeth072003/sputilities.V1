const { getHome, getUser, getArtist } = require("../Controller/tasks");
const { fetchLiked } = require("../Controller/feature 1/fetchLiked");
const { getLogin } = require("../Controller/login");
const { callBac, getAccessToken, getcheck } = require("../Controller/callback");
const { createPlaylist } = require("../Controller/feature 1/createPlaylist");
const { addSongs } = require("../Controller/feature 1/AddSongs");
const { getFeat_1 } = require("../Controller/Main/feat_1");
const express = require("express");

const router = express.Router();

router.get("/", getHome);
router.get("/login", getLogin);
router.get("/login/callback", callBac);
router.get("/check-login", getcheck);
router.get("/access", getAccessToken);
router.get("/fetch", getUser);
router.get("/artist", getArtist);
router.get("/liked", fetchLiked);
router.post("/playlist", createPlaylist);
router.get("/addsong", addSongs);

router.get("/feat_1", getFeat_1);

module.exports = router;
