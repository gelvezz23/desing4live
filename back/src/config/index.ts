import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "./../../.env") });

export default {
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  SECRET: process.env.SECRET_KEY_JWT || "",
  SENDER_EMAIL: process.env.SENDER_EMAIL || "",
  SENDER_PASSWORD: process.env.SENDER_EMAIL || "",
  NODE_ENV: process.env.NODE_ENV || "development",
};
