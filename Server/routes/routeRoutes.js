import express from "express";
import {
  addNewRoute,
  updateRoute,
  deleteRoute,
  getRoute,
} from "../Controllers/route.js";
import { verifyToken } from "../Controllers/auth.js";

const routeRouter = express.Router();

routeRouter.post("/", addNewRoute);
routeRouter.get("/", getRoute);

routeRouter.put("/:id", updateRoute);
routeRouter.delete("/:id", deleteRoute);

export default routeRouter;
