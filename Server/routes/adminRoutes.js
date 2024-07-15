import express from "express";
import {
  adminRegisterHandler,
  adminLoginHandler,
} from "../Controllers/admin/admin.js";
import { verifyToken } from "../Controllers/auth.js";
const adminRouter = express.Router();

adminRouter.post("/register", verifyToken, adminRegisterHandler);
adminRouter.post("/login", adminLoginHandler);

export default adminRouter;
