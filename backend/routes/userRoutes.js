import express from "express";
import { createUser, loginUser,logoutCurrentUser,getAllUsers } from "../controllers/userController.js";
import { authenticate,authorizedAdmin} from "../middlewares/authMiddleware.js";
const router = express.Router();
router.route("/").post(createUser).get(authenticate,authorizedAdmin,getAllUsers)
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
export default router;
