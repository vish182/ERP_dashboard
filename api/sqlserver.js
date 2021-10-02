// const config = require("../dbconfig");
// const sql = require("mssql");
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
    database: "ExampleDB", //update me
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

console.log("euuuuuuuuuuuu");

exports.executeSQL = (req, res) => {
  response = [];

  request = new Request(
    "SELECT * FROM [ExampleDB].dbo.EMPHASYS ORDER BY ExecutedOn ASC OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;",
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        // Next SQL statement.
        console.log("sending res");
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

  console.log("endd");
};

exports.tryThis = () => {
  console.log("done this");
  // getAllrecords().then((data) => {
  //   console.log(data);
  // });
  //connection.connect();
  // const response = executeSQL();
  // console.log("response: ", response);
};
