import { Router } from "express";
import {
  createCompany,
  listCompany,
  updateCompany,
  deleteCompany,
} from "./company.controller";
import { validateHandler } from "../../middleware/middleware";
import {
  createCompanyDto,
  listCompanyDto,
  updateCompanyDto,
} from "./company.dto";
import { verifyToken } from "./../../middleware/authJwt";

const router = Router();

router.get(
  "/:id",
  verifyToken,
  validateHandler(listCompanyDto, "params"),
  listCompany
);
router.post(
  "/",
  verifyToken,
  validateHandler(createCompanyDto, "body"),
  createCompany
);

router.patch(
  "/:id",
  verifyToken,
  validateHandler(listCompanyDto, "params"),
  validateHandler(updateCompanyDto, "body"),
  updateCompany
);

router.delete(
  "/:id",
  verifyToken,
  validateHandler(listCompanyDto, "params"),
  deleteCompany
);

export default router;
