import { NextFunction, Request, Response } from "express";
import ProductsService from "./products.service";
const service = new ProductsService();
export const listProductsCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const date = new Date();
    const response = { message: "", error: false, date };
    const result = await service.listByCompany(id);
    if (!result) {
      response.message = "algo salio mal, porfavor intenta mas tarde";
      response.error = true;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, quantity, price, description, image, idCompany } = req.body;
    const date = new Date();
    const response = { message: "", error: false, date };
    const result = await service.create({
      name,
      quantity,
      price,
      description,
      image,
      idCompany,
    });
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

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const date = new Date();
    const response = { message: "", error: false, date };
    const { id } = req.params;
    const { name, quantity, price, description, image, idCompany } = req.body;
    const result = await service.update(id, {
      name,
      quantity,
      price,
      description,
      image,
      idCompany,
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

export const deleteProduct = async (
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
