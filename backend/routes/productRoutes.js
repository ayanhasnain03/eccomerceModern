import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

export default router;
