import express from "express";
import {
  getUserJournals,
  createJournal,
  updateJournal,
  deleteJournal,
  finishJournal,
} from "../controllers/journalController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/", authenticate, getUserJournals);
router.post("/", authenticate, createJournal);
router.put("/:id", authenticate, updateJournal);
router.delete("/:id", authenticate, deleteJournal);
router.post("/finish", authenticate, finishJournal);

export default router;
