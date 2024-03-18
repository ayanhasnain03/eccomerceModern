import express from "express";

const router = express.Router();

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrders,getUserOrders,countTotalOrders } from "../controllers/orderController.js";
router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizedAdmin, getAllOrders);
  router.route('/mine').get(authenticate,getUserOrders);
  router.route('/total-orders').get(countTotalOrders)
export default router;
