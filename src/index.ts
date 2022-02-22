import express, { json } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { userRouter } from "./routes/userRoutes";
import cors from "cors";

//allowing access to env variables
config();
//initialization
const app = express();
const clientUrl = process.env.CLIENT_URL;
const DB = process.env.DB;
const backendPort = process.env.BACKEND_PORT || 5000;

//middlewares
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);
app.use(json());
app.use(userRouter);

//connecting to database followed by server

mongoose
  .connect(DB || "")
  .then(() =>
    app.listen(backendPort, () =>
      console.log("server listening on port " + backendPort)
    )
  )
  .catch((e: Error) => console.log(e.message));
