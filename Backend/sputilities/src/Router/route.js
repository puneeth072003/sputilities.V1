const { getHome, getUser, getArtist } = require("../Controller/tasks");
const { fetchLiked } = require("../Controller/fetchLiked");
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
router.get("/liked", fetchLiked);
module.exports = router;
