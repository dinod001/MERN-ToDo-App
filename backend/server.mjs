import express from "express";
import dotenv from "dotenv";

const server = express();

server.get("/", (req, res) => {
  res.send("Server is ready");
});

server.listen(5000, () => {
  console.log("server is running....");
});
