// const config = require("../dbconfig");
// const sql = require("mssql");
const { tables, database } = require("../dbconfig");
const Request = require("tedious").Request;

// const getAllrecords = async () => {
//   try {
//     let pool = await sql.connect(config);
//     let records = await pool.request().query("SELECT * FROM EMPHASYS;");
//     console.log(records);
//     return records;
//   } catch (error) {
//     console.log(error, "error");
//   }
// };

var Connection = require("tedious").Connection;
// var utility = require("./utility/utility");

var config = {
  server: "localhost", //\\SQLEXPRESS", //update me
  authentication: {
    type: "default",
    options: {
      userName: "vish", //update me
      password: "vish", //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: database.withoutBraces, //update me
  },
};
var connection = new Connection(config);

connection.on("connect", function (err) {
  if (err) {
    console.log("error connecting: ", err);
  } else {
    console.log("connected");
    // const response = executeSQL();
    // console.log("connected: ", response);
  }
});

connection.connect();

console.log("Starting . .");

exports.executeSQL = (req, res) => {
  let offset = req.offset ? req.offset : 0;

  response = [];

  request = new Request(
    `SELECT * FROM ${tables.mainRecords} WHERE ExecutionType != 'Executed' ORDER BY ExecutedOn DESC OFFSET ${offset} ROWS FETCH NEXT 25 ROWS ONLY;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        // Next SQL statement.
        //console.log("sending res");
        res.json(response);
      }
    }
  );

  connection.execSql(request);
  let counter = 0;

  request.on("row", function (columns) {
    response.push({});
    columns.forEach(function (column) {
      //console.log(column.value);
      response[counter][column.metadata.colName] = column.value;
    });
    counter += 1;
  });

  //console.log("get records without filters");
};

exports.getFilterdResults = (req, res) => {
  let offset = req.offset ? req.offset : 0;
  let filter = req.body;
  console.log("filter in getFilteredResults: ", filter);
  response = [];

  request = new Request(
    `SELECT * FROM ${tables.mainRecords} WHERE ExecutionType != 'Executed' AND EnggStatus != 'Solved' ${filter.conditions} ORDER BY ExecutedOn DESC OFFSET ${offset} ROWS FETCH NEXT 25 ROWS ONLY;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log("[ERROR] getFilterdResults: ", err);
      } else {
        // Next SQL statement.
        //console.log("sending filtered results");
        res.json(response);
      }
    }
  );

  connection.execSql(request);
  let counter = 0;

  request.on("row", function (columns) {
    response.push({});
    columns.forEach(function (column) {
      //console.log(column.value);
      response[counter][column.metadata.colName] = column.value;
    });
    counter += 1;
  });

  //console.log("end sending Filtered Results");
};

exports.getSolvedResults = (req, res) => {
  let offset = req.offset ? req.offset : 0;
  let filter = req.body;
  console.log("filter in getFilteredResults: ", filter);
  response = [];

  request = new Request(
    `SELECT * FROM ${tables.mainRecords} WHERE ExecutionType != 'Executed' AND EnggStatus = 'Solved' ${filter.conditions} ORDER BY ExecutedOn DESC OFFSET ${offset} ROWS FETCH NEXT 25 ROWS ONLY;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log("[ERROR] getSolvedResults: ", err);
      } else {
        // Next SQL statement.
        //console.log("sending filtered results");
        res.json(response);
      }
    }
  );

  connection.execSql(request);
  let counter = 0;

  request.on("row", function (columns) {
    response.push({});
    columns.forEach(function (column) {
      //console.log(column.value);
      response[counter][column.metadata.colName] = column.value;
    });
    counter += 1;
  });

  //console.log("end sending Filtered Results");
};

exports.getFilterdArchivedResults = (req, res) => {
  let offset = req.offset ? req.offset : 0;
  let filter = req.body;
  console.log("filter: ", filter);
  response = [];

  request = new Request(
    `SELECT * FROM ${tables.archiveRecords} WHERE ExecutionType != 'Executed' ${filter.conditions} ORDER BY ExecutedOn DESC OFFSET ${offset} ROWS FETCH NEXT 25 ROWS ONLY;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log("[ERROR] getFilterdArchivedResults: ", err);
      } else {
        // Next SQL statement.
        //console.log("Send Filtered Archived Results");
        res.json(response);
      }
    }
  );

  connection.execSql(request);
  let counter = 0;

  request.on("row", function (columns) {
    response.push({});
    columns.forEach(function (column) {
      //console.log(column.value);
      response[counter][column.metadata.colName] = column.value;
    });
    counter += 1;
  });

  //console.log("end Filtered Archive results");
};

exports.getTimeSeriesTotal = (req, res) => {
  req.series = [];

  // for(let i=0; i<10; i++){
  //   getTimeSeries();
  // }
};

exports.getTimeSeries = (req, res) => {
  let utc = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
  let starttime = req.starttime;
  let endtime = req.endtime;

  console.log(starttime, " -- ", endtime);

  response = 0;

  request = new Request(
    `SELECT COUNT(ExecutedOn) FROM ${tables.mainRecords} WHERE ExecutedOn > '${starttime}' AND ExecutedOn < '${endtime}' AND ExecutionType = 'NotExecuted';`,
    function (err, rowCount, rows) {
      if (err) {
        console.log("[ERROR] getTimeSeries: ", err);
      } else {
        // Next SQL statement.
        //console.log("time res: ", response);
        res.json({ count: response });
      }
    }
  );

  connection.execSql(request);
  let counter = 0;

  request.on("row", function (columns) {
    // response.push({});
    columns.forEach(function (column) {
      //console.log(column.value);
      response = column.value;
    });
    counter += 1;
  });

  //console.log("end time response");
};

exports.updateJobStatus = (req, res) => {
  console.log(req.body);
  const jobKey = req.body.jobKey;
  const updateMessage = req.body.updateMessage;
  const jobStatus = req.body.jobStatus;

  response = "updated";
  request = new Request(
    `UPDATE ${tables.mainRecords} SET EnggStatus = '${jobStatus}', EnggMessage= '${updateMessage}' WHERE JobKey = ${jobKey};`,
    function (err, rowCount, rows) {
      if (err) {
        response.error = err;
        console.log("[ERROR] updateJobStatus: ", err);
      } else {
        // Next SQL statement.
        //console.log("update job status success");
        res.json(response);
      }
    }
  );

  connection.execSql(request);
  //console.log("update job status end");
};

exports.archiveJobs = (req, res) => {
  console.log(req.body);
  const date = req.body.date;

  response = "archived";
  request = new Request(
    `BEGIN TRANSACTION;
    INSERT INTO ${tables.archiveRecords}
    SELECT *
    FROM ${tables.mainRecords}
    WHERE ExecutedOn < '${date}';
    
    DELETE FROM ${tables.mainRecords}
    WHERE ExecutedOn < '${date}';
    
    COMMIT;`,
    function (err, rowCount, rows) {
      if (err) {
        response.error = err;
        console.log("[ERROR] archiveJobs: ", err);
      } else {
        // Next SQL statement.
        //console.log("Archiving jobs");
        res.json(response);
      }
    }
  );

  connection.execSql(request);
  //console.log("end Archving jobs");
};

exports.purgeJobs = (req, res) => {
  console.log(req.body);
  const date = req.body.date;

  response = "purged";
  request = new Request(
    `DELETE FROM ${tables.archiveRecords}
    WHERE ExecutedOn < '${date}';`,
    function (err, rowCount, rows) {
      if (err) {
        response.error = err;
        console.log("[ERROR] archiveJobs: ", err);
      } else {
        // Next SQL statement.
        //console.log("Archiving jobs");
        res.json(response);
      }
    }
  );

  connection.execSql(request);
  //console.log("end Archving jobs");
};

exports.tryThis = () => {
  console.log("done this");
  // let response = getTimeSeries2();
  // console.log("time: ", response);
};

exports.getOffset = (req, res, next, offset) => {
  req.offset = offset;
  next();
};

exports.getStartTime = (req, res, next, starttime) => {
  req.starttime = starttime;
  next();
};

exports.getEndTime = (req, res, next, endtime) => {
  req.endtime = endtime;
  next();
};

exports.getExecutionTypeCount = (req, res) => {
  response = [];

  let date = new Date();
  var dateString;

  dateString =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  //console.log(dateString);

  request = new Request(
    `SELECT ExecutionType, COUNT(*) totalCount FROM ${tables.mainRecords} WHERE ExecutedOn > '${dateString}' AND ExecutionType != 'Executed' GROUP BY ExecutionType;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log("[ERROR] getExecutionTypeCount: ", err);
      } else {
        // Next SQL statement.
        //console.log("Execution type count");
        res.json(response);
      }
    }
  );

  connection.execSql(request);
  let counter = 0;

  request.on("row", function (columns) {
    response.push({});
    columns.forEach(function (column) {
      //console.log(column.value);
      response[counter][column.metadata.colName] = column.value;
    });
    counter += 1;
  });

  //console.log("end Execution type count");
};

exports.getCompanyListWithCount = (req, res) => {
  console.log("company list here: ", req.body);

  response = [];

  request = new Request(
    `SELECT Customer, Company, COUNT(*) totalCount FROM ${tables.mainRecords} WHERE ExecutionType != 'Executed' AND EnggStatus != 'Solved' ${req.body.condition} GROUP BY Customer, Company`,
    function (err, rowCount, rows) {
      if (err) {
        console.log("[ERROR] getCompanyListWithCount: ", err);
      } else {
        // Next SQL statement.
        //console.log("Company List with count");
        res.json(response);
      }
    }
  );

  connection.execSql(request);
  let counter = 0;

  request.on("row", function (columns) {
    response.push({});
    columns.forEach(function (column) {
      //console.log(column.value);
      response[counter][column.metadata.colName] = column.value;
    });
    counter += 1;
  });

  //console.log("end Comapny List with count");
};

exports.getHistoryCompanyListWithCount = (req, res) => {
  console.log("company list here: ", req.body);

  response = [];

  request = new Request(
    `SELECT Customer, Company, COUNT(*) totalCount FROM ${tables.mainRecords} WHERE EnggStatus = 'Solved' ${req.body.condition} GROUP BY Customer, Company`,
    function (err, rowCount, rows) {
      if (err) {
        console.log("[ERROR] getHistoryCompanyListWithCount: ", err);
      } else {
        // Next SQL statement.
        //console.log("Company List with count");
        res.json(response);
      }
    }
  );

  connection.execSql(request);
  let counter = 0;

  request.on("row", function (columns) {
    response.push({});
    columns.forEach(function (column) {
      //console.log(column.value);
      response[counter][column.metadata.colName] = column.value;
    });
    counter += 1;
  });

  //console.log("end Comapny List with count");
};

// const getTimeSeries2 = () => {
//   response = [];

//   request = new Request(
//     `SELECT COUNT(ExecutedOn) FROM [ExampleDB].dbo.EMPHASYS2 WHERE ExecutedOn > '2021-08-30' AND ExecutedOn < '2021-08-31' AND ExecutionType = 'NotExecuted';`,
//     function (err, rowCount, rows) {
//       if (err) {
//         console.log(err);
//       } else {
//         // Next SQL statement.
//         console.log("sending res");
//         return response;
//       }
//     }
//   );

//   connection.execSql(request);
//   let counter = 0;

//   request.on("row", function (columns) {
//     response.push({});
//     columns.forEach(function (column) {
//       //console.log(column.value);
//       response[counter][column.metadata.colName] = column.value;
//     });
//     counter += 1;
//   });

//   console.log("endd");
// };
