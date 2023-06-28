import { connect } from "mongoose";
import config from "./../../config";

const URI = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@learning.4yxzohu.mongodb.net/desingforlive`;
export const connectionMongo = async () => {
  try {
    await connect(URI);
    console.log(`Connect With Data Base`);
  } catch (error) {
    console.log(`[NOT Connect With Data Base]: ${error}`);
  }
};
