import { z, string, ZodType } from "zod";
export class UserValidation {
  static readonly CREATE: ZodType = z
    .object({
      fullname: string({ required_error: "Fullname is required" }),
      email: string({ required_error: "Email is required" }).email(
        "Invalid email"
      ),
      role: z.enum(["admin", "cashier", "employee"]).optional(),
      password: string({ required_error: "Password is required" })
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
      passwordConfirm: string({
        required_error: "Please confirm your password",
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Passwords do not match",
    });

  static readonly LOGIN: ZodType = z.object({
    email: string({ required_error: "Email is required" }).email(
      "Email or password wrong"
    ),
    password: string({ required_error: "Password is required" }).min(
      8,
      "Email or password wrong"
    ),
  });

  static readonly UPDATE: ZodType = z
    .object({
      fullname: string({ required_error: "Fullname is required" }).optional(),
      email: string({ required_error: "Email is required" })
        .email("Invalid email")
        .optional(),
      role: z.enum(["admin", "cashier", "employee"]).optional(),
      password: string({ required_error: "Password is required" })
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters")
        .optional(),
      passwordConfirm: string({
        required_error: "Please confirm your password",
      }).optional(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Passwords do not match",
    });

  static readonly FINDBYID: z.ZodType<string> = z.string({
    required_error: "Id is required",
  });

  static readonly SEARCH: ZodType = z.object({
    search: z.string().optional(),
    page: z.number().min(1).positive(),
    limit: z.number().min(1).max(100).positive(),
  });
}
