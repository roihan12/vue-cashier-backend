import { web } from "./application/web";
import { logger } from "./application/logging";
import config from "../config/default";
import dbConnection from "./application/database";

const MONGODB_URL = config.dbUri;

dbConnection.connect(MONGODB_URL as string);

const PORT = config.port;

web.listen(PORT, () => {
  logger.info(`App started at http://localhost:${PORT}`);
});
