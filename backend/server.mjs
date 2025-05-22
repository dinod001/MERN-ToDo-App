import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";

dotenv.config();

const server = express();

server.get("/", (req, res) => {
  res.send("Server is ready");
});

server.listen(5000, () => {
  connectDB();
  console.log("server is running....");
});
