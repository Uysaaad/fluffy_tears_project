import express from "express";
import {
  addEmotion,
  getEmotions,
  deleteEmotion,
} from "../controllers/emotionGalleryController.js";
import { verifyToken } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addEmotion);
router.get("/", verifyToken, getEmotions);
router.delete("/:id", verifyToken, deleteEmotion);

export default router;
