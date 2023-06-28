import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";

import { RoleModel } from "./../components/Role/role.model";
import { TokenInterface } from "./../components/Register/types";
import { RegisterModel } from "./../components/Register/register.model";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  try {
    const { headers } = req;
    const token = headers["x-access-token"];
    if (!token) {
      return res
        .status(403)
        .json({ message: "token esta vacio", error: true, date });
    }
    const decode = token && verify(`${token}`, config.SECRET);
    req.userId = (<TokenInterface>decode).userFound._id;
    const verifyUser = await RegisterModel.findById(req.userId, {
      password: 0,
    });

    if (!verifyUser) {
      return res
        .status(404)
        .json({ message: "token invalido", error: true, date });
    }
    next();
  } catch (error) {
    return res.status(404).json({
      message: "Sin permisos",
      error: true,
      date,
      messageError: error,
    });
  }
};

export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  try {
    const verifyUser = await RegisterModel.findById(req.userId, {
      password: 0,
    });
    const roles = await RoleModel.find({ _id: { $in: verifyUser?.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "user") {
        next();
        return;
      }
    }
    return res
      .status(403)
      .json({ message: "Requiere ser admin", error: true, date });
  } catch (error) {
    return res.status(500).json({
      message: "Sin permisos",
      error: true,
      date,
      messageError: error,
    });
  }
};
