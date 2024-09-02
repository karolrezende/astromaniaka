import { userRegisterSchema } from "./user.schemas";
import { Type_post_enum } from "@/utils/enums";
import { z } from "zod";

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  is_accepted: z.boolean(),
  picture: z.string().nullish(), // Descomente se precisar da imagem opcional
  post_type: z.nativeEnum(Type_post_enum).nullish(),
  userId: z.string(),
  createdAt: z.date(),
  deletedAt: z.date().nullish(),
  user: z.object({
    id: z.string(),
    name: z.string(),
  }),
  comments: z.array(
    z.object({
      id: z.string(),
      description: z.string(),
      createdAt: z.date(),
      user: userRegisterSchema, // Referenciando o schema de usuário
    })
  ),
});
export const postRegisterSchema = postSchema.omit({
  id: true,
  is_accepted: true,
  user: true,
  createdAt: true,
  deletedAt: true,
});
