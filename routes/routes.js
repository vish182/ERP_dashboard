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
  getCompanyListWithCount,
  getSolvedResults,
  getHistoryCompanyListWithCount,
  purgeJobs,
} = require("../api/sqlserver");
const { sendMail } = require("../api/mail");
const router = express.Router();

router.get("/", tryThis);

router.get("/records/:offset", executeSQL);

router.post("/filteredrecords/:offset", getFilterdResults);

router.post("/solvedrecords/:offset", getSolvedResults);

router.post("/filtered_archived_records/:offset", getFilterdArchivedResults);

router.get("/execution_type", getExecutionTypeCount);

router.post("/company_list", getCompanyListWithCount);

router.post("/history_company_list", getHistoryCompanyListWithCount);

router.post("/update_job_status", updateJobStatus);

router.post("/archive_jobs", archiveJobs);

router.post("/purge_jobs", purgeJobs);

router.get("/timeseries/:starttime/:endtime", getTimeSeries);

router.post("/activation_mail", sendMail);

router.param("offset", getOffset);
router.param("starttime", getStartTime);
router.param("endtime", getEndTime);

module.exports = router;
