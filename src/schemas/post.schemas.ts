import { Type_post_enum } from "@/utils/enums";
import { z } from "zod";

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  is_accepted: z.boolean(),
  // picture: z.string().nullish(),
  post_type: z.nativeEnum(Type_post_enum).nullish(),
  userId: z.string(),
  createdAt: z.date(),
  deletedAt: z.date().nullish(),
  user: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const postRegisterSchema = postSchema.omit({
  id: true,
  is_accepted: true,
  user: true,
  createdAt: true,
  deletedAt: true,
});
