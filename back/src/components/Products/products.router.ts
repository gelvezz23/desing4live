import { Router } from "express";
import {
  listProductsCompany,
  createProducts,
  updateProduct,
  deleteProduct,
} from "./products.controller";
import { validateHandler } from "../../middleware/middleware";
import {
  listProductsDto,
  createProductDto,
  deleteProductsDto,
} from "./products.dto";
import { verifyToken } from "./../../middleware/authJwt";

const router = Router();

router.get(
  "/:id",
  verifyToken,
  validateHandler(listProductsDto, "params"),
  listProductsCompany
);
router.post(
  "/",
  verifyToken,
  validateHandler(createProductDto, "body"),
  createProducts
);

router.patch(
  "/:id",
  verifyToken,
  validateHandler(listProductsDto, "params"),
  validateHandler(createProductDto, "body"),
  updateProduct
);

router.delete(
  "/:id",
  verifyToken,
  validateHandler(deleteProductsDto, "params"),
  deleteProduct
);

export default router;
