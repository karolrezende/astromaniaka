/* eslint-disable @typescript-eslint/no-explicit-any */
import baseURL from "@/environments/baseURL";
import { postRegisterType, postType } from "@/types/post.types";

export const createPost = async (data: postRegisterType) => {
  try {
    const res = await baseURL.post("/posts", {
      title: data.title,
      description: data.description,
      userId: data.userId,
      post_type: data.post_type,
      // picture: data.pictures
    });

    if (res.status != 201) {
      return res.status;
    }
    window.location.reload();
    return res.data;
  } catch (err: any) {
    return err.request.status;
  }
};

export const getAllPosts = async (token: string) => {
  try {
    const response = await baseURL.get<postType[]>("/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }
};

export const deletePosts = async (id: string, token: string) => {
  try {
    const response = await baseURL.delete(`posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error("Failed to delete post", error);
    throw error;
  }
};
