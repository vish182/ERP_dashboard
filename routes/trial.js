const express = require("express");
const {
  tryThis,
  executeSQL,
  getOffset,
  getExecutionTypeCount,
} = require("../api/sqlserver");
const router = express.Router();

router.get("/records/:offset", executeSQL);

router.get("/execution_type", getExecutionTypeCount);

router.param("offset", getOffset);

module.exports = router;
