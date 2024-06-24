import express from "express";
import {
  getUserEmotionGallery,
  addEmotionGalleryItem,
  deleteEmotionGalleryItem,
} from "../controllers/emotionGalleryController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/", authenticate, getUserEmotionGallery);
router.post("/", authenticate, addEmotionGalleryItem);
router.delete("/:id", authenticate, deleteEmotionGalleryItem);

export default router;
