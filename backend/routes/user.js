import {
  authenticate
} from "../auth/verifyToken.js";
import {
  deleteUser,
  getAllUser,
  getUserProfile,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

// get all users
router.get("/", authenticate, getAllUser);
router.get("/:id", authenticate, getSingleUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

router.get("/profile/me", authenticate, getUserProfile);


export default router;
