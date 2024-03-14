import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  thumbnails: string[];
  price: number;
  categoryId: mongoose.Types.ObjectId;
  status: "active" | "inactive";
  createdAt?: number;
  updatedAt?: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    thumbnails: [{ type: String, required: true }],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    price: { type: Number, required: true },
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

ProductSchema.virtual("categories", {
  ref: "category",
  localField: "categoryId",
  foreignField: "_id",
});

const Product = mongoose.model<IProduct>("product", ProductSchema);

export default Product;
