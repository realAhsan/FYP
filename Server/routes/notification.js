import express from "express";
import { addNotification ,getNotifications} from "../Controllers/notification.js";

const notificationRouter = express.Router();

notificationRouter.post("/", addNotification);
notificationRouter.get('/',getNotifications)

export default notificationRouter;
