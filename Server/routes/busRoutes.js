import express from "express";
import {
  addNewBus,
  updateBus,
  deleteBus,
  getBuses,
  getBus,
} from "../Controllers/bus.js";
import { verifyToken } from "../Controllers/auth.js";

const busRouter = express.Router();

busRouter.post("/", addNewBus);
busRouter.get("/", getBuses);
busRouter.get("/:busNo", getBus);

busRouter.put("/:id", updateBus);
busRouter.delete("/:id", deleteBus);

export default busRouter;
