import { web } from "./application/web";
import { logger } from "./application/logging";
import config from "../config/default";

const PORT = config.port;
web.listen(PORT, () => {
  logger.info(`App started at http://localhost:${PORT}`);
});
