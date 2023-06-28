import { Schema, model } from "mongoose";
import { MODEL_TABLE_AUTH_ROLE } from "../Role/role.model";

export const MODEL_TABLE_SIGN_MODEL = "Users";
const registerModel = new Schema({
  date: Date,
  email: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  password: { type: String, require: true },
  roles: [{ ref: MODEL_TABLE_AUTH_ROLE, type: Schema.Types.ObjectId }],
});

export const RegisterModel = model(MODEL_TABLE_SIGN_MODEL, registerModel);
