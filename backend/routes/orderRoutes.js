import express from "express";

const router = express.Router()

import {authenticate,authorizedAdmin} from "../middlewares/authMiddleware.js"
import { createOrder,getAllOrders } from "../controllers/orderController.js";
router.route('/').post(authenticate,createOrder).get(authenticate,authorizedAdmin,getAllOrders)
export default router;