import { userLoginSchema, userRegisterSchema } from "@/schemas/user.schemas";
import { z } from "zod";

export type userLogin = z.infer<typeof userLoginSchema>

export type userRegister= z.infer<typeof userRegisterSchema>
