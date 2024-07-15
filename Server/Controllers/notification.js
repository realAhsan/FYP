import Notification from "../Models/notification.js";

export const addNotification = async (req, res) => {
  try {
    const { title, body, createdby } = req.body;
    const Msg = await Notification.create({ title, body, createdby });
    res.status(201).json({ message: "success", body: Msg });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getNotifications = async (req, res) => {
  try {
    const Notifications = await Notification.find();
    res.json(Notifications);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

