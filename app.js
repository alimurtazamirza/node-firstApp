const express = require("express");
const path = require("path");

const feedRoutes = require("./routes/feed");
const httpRoutes = require("./routes/http");
const Sequelize = require("./util/database");

const app = express();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//routes

app.use("/feed", feedRoutes);
app.use("/http", httpRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  res.status(status).json({
    message: error.message,
    type: error.name,
    statusCode: status,
    ...error,
  });
});

app.use((req, res) => {
  res.status(404).json({
    exception: "no route found",
    url: req.url,
  });
});

Sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established successfully."); // eslint-disable-line no-console
    app.listen(3010);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err); // eslint-disable-line no-console
  });
