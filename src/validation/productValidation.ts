import { z } from "zod";

export class ProductValidation {
  static readonly CREATE = z.object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, { message: "Title Must be 1 or more characters long" })
      .max(100, { message: "Title Max 100 characters " }),
    thumbnails: z
      .array(z.string({ required_error: "thumbnails is required" }))
      .nonempty({ message: "At least one thumbnail is required" }),
    price: z.number({ required_error: "Price is required" }).positive({
      message: "Price must be positive number",
    }),
    categoryId: z.string({ required_error: "Category id is required" }),
  });
}
