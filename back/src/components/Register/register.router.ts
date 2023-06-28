import { Router } from "express";
import { createUser } from "./register.controller";
import { validateHandler } from "../../middleware/middleware";
import { createRegisterDto } from "./register.dto";

const router = Router();

router.get("/", () => {});
router.post(
  "/",

  validateHandler(createRegisterDto, "body"),
  createUser
);

export default router;
