import express from "express";
import { authenticate,authorizedAdmin } from "../middlewares/authMiddleware.js";
import {createCategory} from "../controllers/categoryController.js"
const router = express.Router()
router.route("/").post(authenticate,createCategory);


export default router;