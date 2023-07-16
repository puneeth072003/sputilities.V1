const { getHome } = require("../Controller/tasks");
const { getLogin } = require("../Controller/login");
const { callBac } = require("../Controller/callback");
const express = require("express");
const router = express.Router();

router.get("/", getHome);
router.get("/login", getLogin);
router.get("/login/callback", callBac);
// router.post("/fetch", getProfile);
module.exports = router;
