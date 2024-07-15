import File from "../Models/File.js";
import path from "path";
import fs from "fs";

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const newFile = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    await newFile.save();

    res
      .status(201)
      .send({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error });
  }
};

const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).send({ message: "File not found" });
    }

    res.sendFile(path.resolve(file.path));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);

    if (!file) {
      return res.status(404).send({ message: "File not found" });
    }

    fs.unlinkSync(file.path);

    res.send({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error });
  }
};

export { uploadFile, getFile, deleteFile };
