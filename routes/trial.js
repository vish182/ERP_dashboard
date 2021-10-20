const express = require("express");
const {
  tryThis,
  executeSQL,
  getOffset,
  getStartTime,
  getEndTime,
  getExecutionTypeCount,
  getTimeSeries,
  getFilterdResults,
  updateJobStatus,
  archiveJobs,
  getFilterdArchivedResults,
} = require("../api/sqlserver");
const router = express.Router();

router.get("/trial", tryThis);

router.get("/records/:offset", executeSQL);

router.post("/filteredrecords/:offset", getFilterdResults);

router.post("/filtered_archived_records/:offset", getFilterdArchivedResults);

router.get("/execution_type", getExecutionTypeCount);

router.post("/update_job_status", updateJobStatus);

router.post("/archive_jobs", archiveJobs);

router.get("/timeseries/:starttime/:endtime", getTimeSeries);

router.param("offset", getOffset);
router.param("starttime", getStartTime);
router.param("endtime", getEndTime);

module.exports = router;
