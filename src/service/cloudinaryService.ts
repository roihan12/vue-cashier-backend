import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
import { CloudinaryResponse } from "../dto/cloudinaryDto";
import { ResponseError } from "../error/responseError";
import config from "../../config/default";

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

export class CloudinaryService {
  static async uploadImage(imageToUpload: string): Promise<CloudinaryResponse> {
    try {
      const cloudinaryImageUploadResponse = await cloudinary.uploader.upload(
        imageToUpload);

      const { url } = cloudinaryImageUploadResponse;

      if (!url) {
        unlinkSync(imageToUpload);
        throw new ResponseError(
          500,
          "Couldn't upload your image at the moment. Please try again later."
        );
      }

      unlinkSync(imageToUpload);
      return {
        message: "Successfully uploaded image.",
        imageURL: url,
      };
    } catch (error) {
      unlinkSync(imageToUpload);
      console.log(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}
