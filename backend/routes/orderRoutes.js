import express from "express";

const router = express.Router();

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrders,getUserOrders } from "../controllers/orderController.js";
router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizedAdmin, getAllOrders);
  router.route('/mine').get(authenticate,getUserOrders)
export default router;
