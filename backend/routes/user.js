import {
  verifyToken
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
router.get("/", verifyToken, getAllUser);
router.get("/:id", verifyToken, getSingleUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

router.get("/profile/me", verifyToken, getUserProfile);


export default router;
