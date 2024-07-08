/* eslint-disable @typescript-eslint/no-explicit-any */
import baseURL from "@/environments/baseURL";
import { postRegisterType } from "@/types/post.types";

export const createPost = async (data: postRegisterType) => {
  try {
    const res = await baseURL.post("/posts", {
      title: data.title,
      description: data.description,
      userId: data.userId,
      post_type: data.post_type,
      picture: data.picture,
    });

    if (res.status != 201) {
      return res.status;
    }

    return res.data;
  } catch (err: any) {
    return err.request.status;
  }
};
