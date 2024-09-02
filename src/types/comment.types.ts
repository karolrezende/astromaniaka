export type commentType = {
  id: string;
  description: string;
  postId: string;
  userId: string;
  createdAt: Date;
};

export type commentTypeRequest = Omit<commentType, "id" | "createdAt">;
