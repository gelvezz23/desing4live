import Joi from "joi";
const name = Joi.string();
const quantity = Joi.string();
const price = Joi.string();
const description = Joi.string();
const image = Joi.string();
const idCompany = Joi.string();
const idProduct = Joi.string();

export const createProductDto = Joi.object({
  name: name.required(),
  quantity: quantity.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  idCompany: idCompany.required(),
});

export const updateProductDto = Joi.object({
  name: name.required(),
  quantity: quantity.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  idProduct: idProduct.required(),
});

export const listProductsDto = Joi.object({
  idCompany: idCompany.required(),
});

export const deleteProductsDto = Joi.object({
  idProduct: idProduct.required(),
});
