import { Schema, model } from "mongoose";

export const MODEL_TABLE_COMAPANY = "Company";
const companyModel = new Schema({
  date: Date,
  name: { type: String, require: true },
  phone: { type: String, require: true },
  nit: { type: String, require: true },
  address: { type: String, require: true },
  user: { type: Schema.Types.ObjectId, ref: "Users" },
});

export const CompanyModel = model(MODEL_TABLE_COMAPANY, companyModel);
