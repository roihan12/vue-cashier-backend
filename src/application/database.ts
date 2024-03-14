import mongoose from "mongoose";
import { logger } from "./logging";

class DatabaseConfig {
  connect = (url: string) => {
    return new Promise<void>((resolve, reject) => {
      mongoose
        .connect(url)
        .then(() => {
          logger.info(`Mongo Db Connected: ${mongoose.connection.host}`);
          resolve(); // Resolve promise setelah koneksi berhasil
        })
        .catch((error) => {
          logger.error(`Error connecting to MongoDB: ${error}`);
          reject(error); // Reject promise jika terjadi kesalahan
        });
    });
  };

  disconnect = () => {
    mongoose.connection.close();
  };
}

export default new DatabaseConfig();
