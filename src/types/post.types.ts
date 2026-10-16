import { postCommentSchema, postRegisterSchema, postSchema } from "@/schemas/post.schemas";
import { z } from "zod";

export type postType = z.infer<typeof postSchema>
export type postRegisterType = z.infer<typeof postRegisterSchema>
export type postCommentType = z.infer<typeof postCommentSchema>

export type feedPageType = {
  items: postType[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export type postStatus = "ACCEPTED" | "PENDING" | "REJECTED"

export type myPostType = {
  id: string
  title: string
  description: string
  post_type: string
  createdAt: string
  status: postStatus
  rejection_reason: string | null
  rejectedAt: string | null
  likesCount: number
  commentsCount: number
}
