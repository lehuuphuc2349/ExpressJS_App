const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const connectDB = require("./server/database/connection");
app.set("view engine", "ejs");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;
connectDB();

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));

app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log("Port: " + PORT);
});
