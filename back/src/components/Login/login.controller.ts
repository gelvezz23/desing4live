import { NextFunction, Request, Response } from "express";
import LoginService from "./login.service";
import { sign } from "jsonwebtoken";
import config from "./../../config";
import { HashingMatch } from "../../utils/pass-hash";
//import { mailer } from "../../../libs/nodemailer";
const service = new LoginService();
export const getSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.header({
      authorization: "TOKEN_JWT",
    });
    const { headers } = req;
    console.log("headers", headers.authorization);
    //const users = await service.find();
    res.json({ api: "on", version: "alpha", endpoint: "/login" });
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const date = new Date();
    const response = { message: "", error: false, token: "", date };
    const userFound = await service.findOne(email);
    const passwordValidate = await HashingMatch(password, userFound?.password);

    const token = sign({ userFound }, config.SECRET, {
      expiresIn: 86400,
    });

    if (!userFound) {
      response.message = "user not found";
      response.error = true;
      res.status(404).json(response);
    }

    if (!passwordValidate) {
      response.message = "password invalid";
      response.error = true;
      res.status(401).json(response);
    }

    response.message = "inicio de sesion exitoso";
    response.error = false;
    response.token = token;
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
