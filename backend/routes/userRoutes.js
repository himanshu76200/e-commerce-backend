import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, registerUser } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"


router.post("/login", authUser)
router.get("/profile", protect, getUserProfile)   // router.route("/profile").get(getUserProfile)
router.post("/", registerUser)

export default router;