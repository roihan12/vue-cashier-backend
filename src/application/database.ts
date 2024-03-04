import mongoose from "mongoose";
import config from "../../config/default";
import { logger } from "./logging";

async function connectToDb() {
  const dbUri = config.dbUri!;

  try {
    const conn = await mongoose.connect(dbUri);
    logger.info(`Mongo Db Connected: ${conn.connection.host}`);
  } catch (e) {
    process.exit(1);
  }
}

export default connectToDb;
