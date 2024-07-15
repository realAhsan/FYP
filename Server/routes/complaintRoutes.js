import express from "express";

const ComplaintRouter = express.Router();
import {
  getComplaints,
  addComplaint,
  updateComplaintStatus,
} from "../Controllers/complaintController.js";

ComplaintRouter.post("/new-complaint", addComplaint);
ComplaintRouter.post("/update-complaint/:id", updateComplaintStatus);
ComplaintRouter.get("/complaints", getComplaints);

export default ComplaintRouter;
