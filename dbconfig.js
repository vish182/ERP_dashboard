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

var config = {
  server: "localhost\\SQLEXPRESS",

  database: "ExampleDB",

  user: "vish", // Update it

  password: "vish", // Update it

  port: 1433,

  extra: { trustServerCertificate: true },
};

module.exports = config;
