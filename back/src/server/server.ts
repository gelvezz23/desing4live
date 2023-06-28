import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import {
  handleErrors,
  logErrors,
  boomHandleErrors,
  ormHandlerError,
} from "../middleware/errors.handle";
import { router } from "./router";
import { options } from "../middleware/cors.validate";
import { connectionMongo } from "../core/database";
import { createRole } from "./../libs/initialSetup";

export const Server = () => {
  const app: Application = express();

  createRole();
  const port: string = process.env.PORT || "4000";
  const host: string = process.env.URL || "localhost";
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(cors(options));

  app.get("/", (req, res) => {
    res.json({
      api: "on",
      version: "alpha",
    });
  });
  const listen = () => {
    try {
      router(app);
      connectionMongo();

      app.use(logErrors);
      app.use(ormHandlerError);
      app.use(boomHandleErrors);
      app.use(handleErrors);

      app.listen(port, () => {
        console.log(`NODE_ENV=${process.env.NODE_ENV}`);
        console.log(`CORS-enabled web server listening on port ${port}`);
        console.log(`Run app in ${host}:${port}`);
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  listen();
};
