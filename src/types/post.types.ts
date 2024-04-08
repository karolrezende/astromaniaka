import { postRegisterSchema, postSchema } from "@/schemas/post.schemas";
import { z } from "zod";

export type postType = z.infer<typeof postSchema>
export type postRegisterType = z.infer<typeof postRegisterSchema>