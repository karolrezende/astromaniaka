import baseURL from "@/environments/baseURL";
import { commentTypeRequest } from "@/types/comment.types";

export const createComment = async (
  commentData: commentTypeRequest,
  token: string
) => {
  try {
    const res = await baseURL.post(
      "/comment",
      {
        postId: commentData.postId,
        description: commentData.description,
        userId: commentData.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status != 201) {
      return res.status;
    }
    // window.location.reload();
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.request.status;
  }
};
