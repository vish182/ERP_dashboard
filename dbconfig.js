var database = {
  withBraces: "[ExampleDB]", // database name
  withoutBraces: "ExampleDB", // database name without brackets
};

var tables = {
  mainRecords: `${database.withBraces}.dbo.EMPHASYS2`, // main jobs table, replace EMPHASYS2 with your table name
  archiveRecords: `${database.withBraces}.dbo.ARCHIVES`, // archive table, replace ARCHIVES with your archive table name
};

module.exports = { tables, database };

// const config = {
//   user: "vish",
//   password: "vish",
//   server: "localhost\\SQLEXPRESS",
//   database: "firstdb",

//   options: {
//     trustedconnection: true,
//     enableArithAbort: true,
//     instancename: "SQLEXPRESS",
//   },
//   port: 1433,
// };

// var config = {
//   server: "localhost\\SQLEXPRESS",

//   database: "firstdb",

//   user: "vish", // Update it

//   password: "vish", // Update it

//   extra: { trustServerCertificate: true },

//   port: 45967,
// };

// var config = {
//   user: "vish",
//   password: "vish",
//   server: "localhost",
//   database: "firstdb",
//   port: 49474, // make sure to change port
//   dialect: "mssql",
//   dialectOptions: {
//     instanceName: "SQLEXPRESS",
//   },
//   extra: { trustServerCertificate: true },
// };

// export var config = {
//   server: "localhost\\SQLEXPRESS",

//   database: "ExampleDB",

//   user: "vish", // Update it

//   password: "vish", // Update it

//   port: 1433,

//   extra: { trustServerCertificate: true },
// };
