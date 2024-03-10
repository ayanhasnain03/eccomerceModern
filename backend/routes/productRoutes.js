import express from "express";
import formidable from "express-formidable";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
  addProdut,
  updateProductDetails,
  removeProduct,
  fetchProducts
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(fetchProducts).post(authenticate, authorizedAdmin, formidable(), addProdut);
router
  .route("/:id")
  .put(authenticate, authorizedAdmin, formidable(), updateProductDetails)
  .delete(authenticate,authorizedAdmin,removeProduct)

export default router;
