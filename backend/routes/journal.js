import express from "express";
import {
  getUserJournals,
  createJournal,
  updateJournal,
  deleteJournal,
  finishJournal,
} from "../controllers/journalController.js";
import { verifyToken } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getUserJournals);
router.post("/", verifyToken, createJournal);
router.put("/:id", verifyToken, updateJournal);
router.delete("/:id", verifyToken, deleteJournal);
router.post("/finish", verifyToken, finishJournal);

export default router;
