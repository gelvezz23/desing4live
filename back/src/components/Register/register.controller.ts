import { NextFunction, Request, Response } from "express";
import RegisterService from "./register.service";
import { sign } from "jsonwebtoken";
import config from "./../../config";
import { encryptPassword } from "../../utils/pass-hash";
import { TypeRegister } from "./types";
import { searchRole } from "../Role/role.controller";
//import { mailer } from "../../../libs/nodemailer";
const service = new RegisterService();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, role, password } = req.body;

    const date = new Date();
    const response = { message: "", error: false, token: "", date };
    const newPassword = await encryptPassword(password);

    const data: TypeRegister = {
      email,
      name,
      password: newPassword,
      date,
    };
    data.roles = await searchRole(role);
    const result = await service.create(data);
    const token = sign(
      { id: result._id, email, name, date, role },
      config.SECRET,
      {
        expiresIn: 86400,
      }
    );
    if (!result) {
      response.message = "algo salio mal, porfavor intenta mas tarde";
      response.error = true;
    }

    response.message = "registro exitoso";
    response.token = token;
    res.json(response);
    //mailer(email);
  } catch (error) {
    next(error);
  }
};
