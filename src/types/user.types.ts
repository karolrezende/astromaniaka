import { userLoginSchema, userRegisterSchema } from "@/schemas/user.schemas";
import { z } from "zod";

export type userLogin = z.infer<typeof userLoginSchema>;

export type userRegister = z.infer<typeof userRegisterSchema>;

export type userWithoutPassword = {
  id: string;
  name: string;
  email: string;
  description: string;
  picture?: string;
  access_level: string;
  astronomers: any[],
  createdAt: Date;
  deletedAt: Date;
};
export type userPassword = {
  email: string;
  password: string;
  confirmPassword: string;
};
