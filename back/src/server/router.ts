import { Application } from "express";
import { Path as path } from "./paths";
import LoginRouter from "./../components/Login/login.router";
import RegisterRouter from "./../components/Register/register.router";
import CompanyRouter from "./../components/Company/company.router";
import ProductRouter from "./../components/Products/products.router";
const { login, register, company, product } = path;
export const router = (app: Application) => {
  app.use(login, LoginRouter);
  app.use(register, RegisterRouter);
  app.use(company, CompanyRouter);
  app.use(product, ProductRouter);
};
