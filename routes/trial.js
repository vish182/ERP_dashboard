const express = require("express");
const { tryThis } = require("../api/sqlserver");
const router = express.Router();

router.get("/abc", tryThis);

module.exports = router;
