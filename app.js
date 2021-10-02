const express = require("express");
const authRoutes = require("./routes/trial");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const port = 8000;
console.log("target");

app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
