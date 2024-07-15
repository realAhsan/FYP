import Complaint from "../Models/Complaint.js";

export const addComplaint = async (req, res) => {
  try {
    const { subject, details } = req.body;

    if (!subject || !details) {
      return res
        .status(400)
        .json({ message: "Subject and details are required" });
    }

    const newComplaint = new Complaint({ subject, details });
    const savedComplaint = await newComplaint.save();

    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ message: "Error adding complaint", error });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const validStatuses = ["Pending", "In Progress", "Resolved", "Closed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: "Error updating complaint status", error });
  }
};
