import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import Todorouter from "./routes/toDo.routes.mjs";

dotenv.config();

const server = express();

server.use(express.json());
server.use("/api/todos", Todorouter);

server.listen(5000, () => {
  connectDB();
  console.log("server is running....");
});
