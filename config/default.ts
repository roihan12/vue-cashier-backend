import "dotenv/config";

export default {
  port: process.env.PORT,
  dbUri: process.env.MONGO_URI,
  accessTokenPrivateKey: "",
  refreshTokenPrivateKey: "",
};
