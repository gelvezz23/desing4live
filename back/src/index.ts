import { config } from "dotenv";
import { Server } from "./server";
import { resolve } from "path";
config({ path: resolve(__dirname, "./../.env") });
Server();