import { Request } from "express";
import { SignPayload } from "../dto/authDto";

export interface UserRequest extends Request {
  user?: SignPayload;
}
