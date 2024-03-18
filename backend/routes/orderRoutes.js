import express from "express";

const router = express.Router()

import {authenticate,authorizedAdmin} from "../middlewares/authMiddleware.js"
import { createOrder } from "../controllers/orderController.js";
router.route('/').post(authenticate,createOrder)
export default router;