import express from "express";
import {
  SaveLocation,
  getLocation,
  updateLocation,
} from "../Controllers/busLocation.js";

const locationRouter = express.Router();

locationRouter.post("/", SaveLocation);
locationRouter.get("/:busNo", getLocation);
locationRouter.post("/:busNo", updateLocation);

export default locationRouter;
