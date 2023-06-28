import { Schema, model } from "mongoose";

export const MODEL_TABLE_AUTH_ROLE = "Role";
const role = new Schema(
  {
    name: { type: String, require: true },
  },
  { versionKey: false }
);

export const RoleModel = model(MODEL_TABLE_AUTH_ROLE, role);