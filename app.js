const express = require("express");

const feedRoutes = require("./routes/feed");
const httpRoutes = require("./routes/http");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("request landded");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//routes

// app.use("/feed", feedRoutes);
app.use("/http", httpRoutes);

app.use((req, res) => {
  res.status(404).json({
    exception: "no route found",
    url: req.url,
  });
});

app.listen(3010);
