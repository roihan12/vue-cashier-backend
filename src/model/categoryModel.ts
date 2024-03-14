import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
  status: "active" | "inactive";
  createdAt?: number;
  updatedAt?: number;
}

const CategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
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

const Category = mongoose.model<ICategory>("category", CategorySchema);

export default Category;
