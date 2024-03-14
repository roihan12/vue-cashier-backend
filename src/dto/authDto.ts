import { IUser } from "../model/userModel";

export type UserResponse = {
  id: string;
  fullname: string;
  email: string;
  role: string;
  status: string;
  createdAt?: number;
  updatedAt?: number;
};

export type SignPayload = {
  id: string;
  role: string;
  status: string;
};

export type CreateUserRequest = {
  fullname: string;
  email: string;
  role?: string;
  password: string;
  passwordConfirm: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  fullname?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  role?: "admin" | "cashier" | "employee";
  status?: "active" | "inactive";
};

export function toUserResponse(user: IUser): UserResponse {
  return {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
