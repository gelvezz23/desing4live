import { NextFunction, Request, Response } from "express";
import CompanyService from "./company.service";

//import { mailer } from "../../../libs/nodemailer";
const service = new CompanyService();

export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, nit, address, phone, user } = req.body;
    const date = new Date();
    const response = { message: "", error: false, date };
    const result = await service.create({ name, nit, address, phone, user });
    if (!result) {
      response.message = "algo salio mal, porfavor intenta mas tarde";
      response.error = true;
    }

    response.message = "registro exitoso";
    res.json(response);
    //mailer(email);
  } catch (error) {
    next(error);
  }
};

export const listCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const date = new Date();
    const response = { message: "", error: false, date };
    const result = await service.listByUser(id);
    if (!result) {
      response.message = "algo salio mal, porfavor intenta mas tarde";
      response.error = true;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const date = new Date();
    const response = { message: "", error: false, date };
    const { id } = req.params;
    const { name, nit, address, phone, user } = req.body;
    const result = await service.update(id, {
      name,
      nit,
      address,
      phone,
      user,
    });
    if (!result) {
      response.message = "algo salio mal, porfavor intenta mas tarde";
      response.error = true;
    }

    response.message = "registro exitoso";

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const date = new Date();
    const response = { message: "", error: false, date };
    const { id } = req.params;
    const result = await service.delete(id);
    if (!result) {
      response.message = "algo salio mal, porfavor intenta mas tarde";
      response.error = true;
    }

    response.message = "Eliminado exitoso";

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
