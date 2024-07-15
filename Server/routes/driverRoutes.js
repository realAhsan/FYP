import express from "express";
import {
  AddNewDriver,
  getDrivers,
  getDriverByBus,
  loginDriver,
} from "../Controllers/driverController.js";
const driverRouter = express.Router();

driverRouter.post("/", AddNewDriver);
driverRouter.post("/login", loginDriver);
driverRouter.get("/", getDrivers);
driverRouter.get("/:busNo", getDriverByBus);

export default driverRouter;
