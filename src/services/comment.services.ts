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

export const editComment = async (
  id: string,
  description: string,
  token: string
) => {
  const res = await baseURL.put(
    `/comment/${id}`,
    { description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteComment = async (id: string, token: string) => {
  await baseURL.delete(`/comment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
