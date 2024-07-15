import express from "express";
import {
  activateUser,
  changePassword,
  userLoginHandler,
  userRegisterHandler,
  forgetPassword,
  resetPassword,
  getAllUsers,
} from "../Controllers/users/userController.js";

import { verifyToken } from "../Controllers/auth.js";
const userRouter = express.Router();

userRouter.post("/register", userRegisterHandler);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", userLoginHandler);
userRouter.post("/change-password", changePassword);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/get", getAllUsers);

export default userRouter;
