import express from "express";
const router = express.Router();
import formidable from "express-formidable";
import { createUploadController } from "../controllers/uploadController.js";

//routes:

//Create upload route:
router.post("/create-upload", formidable(), createUploadController);

export default router;
