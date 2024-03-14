import "dotenv/config";

export default {
  port: process.env.PORT,
  dbUri: process.env.MONGO_URI,
  accessTokenPrivateKey: process.env.JWT_ACCESS_SECRET_KEY,
  refreshTokenPrivateKey: process.env.JWT_REFRESH_SECRET_KEY,
  accessTokenExpireIn: process.env.JWT_ACCESS_EXPIRES_IN,
  refreshTokenExpireIn: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};
