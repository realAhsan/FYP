import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdby: {
    type: String,
  },
  
},{ timestamps: true });

const Notification = mongoose.model("notfications", notificationSchema);
export default Notification;
