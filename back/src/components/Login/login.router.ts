import { Router } from "express";
import { getOneUser, getSignIn } from "./login.controller";
import { validateHandler } from "../../middleware/middleware";
import { createSignInDto } from "./login.dto";
//import { verifyToken } from "../../../middleware/authJwt";

const router = Router();

router.get("/", getSignIn);
router.post(
  "/",
  //verifyToken,
  validateHandler(createSignInDto, "body"),
  getOneUser
);

export default router;
