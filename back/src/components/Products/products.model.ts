import { Schema, model } from "mongoose";

export const MODEL_TABLE_PRODUCT = "Product";
const productModel = new Schema({
  date: Date,
  name: { type: String, require: true },
  quinatity: { type: String, require: true },
  price: { type: String, require: true },
  image: { type: String, require: true },
  description: { type: String, require: true },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
});

export const ProductModel = model(MODEL_TABLE_PRODUCT, productModel);
