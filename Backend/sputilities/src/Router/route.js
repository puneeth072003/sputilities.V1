const { getHome } = require("../Controller/tasks");

const express = require("express");
const router = express.Router();

router.get("/", getHome);

module.exports = router;
