import express from "express";

const router = express.Router();

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrders,getUserOrders,countTotalOrders,calculateTotalSales,calcualteTotalSalesByDate } from "../controllers/orderController.js";
router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizedAdmin, getAllOrders);
  router.route('/mine').get(authenticate,getUserOrders);
  router.route('/total-orders').get(countTotalOrders);
  router.route('/total-sales').get(calculateTotalSales)
  router.route('/total-sales-by-date').get(calcualteTotalSalesByDate)
export default router;
