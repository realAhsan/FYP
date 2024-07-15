import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRouter from "./routes/adminRoutes.js";
import routeRouter from "./routes/routeRoutes.js";
import busRouter from "./routes/busRoutes.js";
import driverRouter from "./routes/driverRoutes.js";
import userRouter from "./routes/userRoutes.js";
import notificationRouter from "./routes/notification.js";
import ComplaintRouter from "./routes/complaintRoutes.js";
import locationRouter from "./routes/locationRouter.js";
import fileRoutes from "./routes/FileRoutes.js";

// Configurations

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes

app.use("/admin", adminRouter);
app.use("/routes", routeRouter);
app.use("/bus", busRouter);
app.use("/driver", driverRouter);
app.use("/notification", notificationRouter);
app.use("/", userRouter);
app.use("/complaint", ComplaintRouter);
app.use("/location", locationRouter);
app.use("/files", fileRoutes);
// mongoose Setup

const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`servers Started at port: ${PORT}`);
      console.log(`DB connected`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
