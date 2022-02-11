import express, { json } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { userRouter } from "./routes/userRoutes";

//initialization
const app = express();
//const DB: string = process.env.DB;
//allowing access to env variables
config();

//middlewares
app.use(json());
app.use(userRouter);

//connecting to database followed by server

mongoose
  .connect(process.env.DB || "")
  .then(() => app.listen(3000, () => console.log("server listening")))
  .catch((e: Error) => console.log(e.message));
