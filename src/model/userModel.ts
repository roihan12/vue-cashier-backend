import mongoose, { Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  role: "admin" | "cashier" | "employee";
  status: "active" | "inactive";
  createdAt?: number;
  updatedAt?: number;
}

const UserSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "cashier", "employee"],
      default: "employee",
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);
UserSchema.plugin(paginate);

const User = mongoose.model<IUser, mongoose.PaginateModel<IUser>>(
  "user",
  UserSchema
);

export default User;
