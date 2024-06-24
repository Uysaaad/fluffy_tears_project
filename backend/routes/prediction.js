import express from "express";
import { predictEmotion } from "../controllers/predictionController.js";

const router = express.Router();

router.post("/", predictEmotion);

export default router;
