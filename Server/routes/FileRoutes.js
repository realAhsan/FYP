import express from "express";
import multer from "multer";
import {
  uploadFile,
  getFile,
  deleteFile,
} from "../Controllers/FileController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/:id", getFile);
router.delete("/:id", deleteFile);

export default router;
