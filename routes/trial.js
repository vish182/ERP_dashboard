const express = require("express");
const { tryThis, executeSQL } = require("../api/sqlserver");
const router = express.Router();

router.get("/abc", executeSQL);

module.exports = router;
