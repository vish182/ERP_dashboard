const express = require("express");
const {
  tryThis,
  executeSQL,
  getOffset,
  getStartTime,
  getEndTime,
  getExecutionTypeCount,
  getTimeSeries,
} = require("../api/sqlserver");
const router = express.Router();

router.get("/trial", tryThis);

router.get("/records/:offset", executeSQL);

router.get("/execution_type", getExecutionTypeCount);

router.get("/timeseries/:starttime/:endtime", getTimeSeries);

router.param("offset", getOffset);
router.param("starttime", getStartTime);
router.param("endtime", getEndTime);

module.exports = router;
