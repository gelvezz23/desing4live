import Joi from "joi";
const address = Joi.string();
const name = Joi.string();
const nit = Joi.string();
const phone = Joi.string();
const user = Joi.string();

export const createCompanyDto = Joi.object({
  user: user.required(),
  name: name.required(),
  nit: nit.required(),
  phone: phone.required(),
  address: address.required(),
});

export const listCompanyDto = Joi.object({
  id: user.required(),
});

export const updateCompanyDto = Joi.object({
  user: user.required(),
  name: name.required(),
  nit: nit.required(),
  phone: phone.required(),
  address: address.required(),
});
