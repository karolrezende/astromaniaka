import { Type_post_enum } from "@/utils/enums";
import { z } from "zod";

export const postCommentSchema = z.object({
  id: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullish(),
  user: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

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
  likesCount: z.number().optional(),
  likedByMe: z.boolean().optional(),
  comments: z.array(postCommentSchema).nullish(),
});
export const postRegisterSchema = postSchema.omit({
  id: true,
  is_accepted: true,
  user: true,
  createdAt: true,
  deletedAt: true,
  likesCount: true,
  likedByMe: true,
  comments: true,
});
