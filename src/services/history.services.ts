/* eslint-disable @typescript-eslint/no-explicit-any */
import baseURL from "@/environments/baseURL";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export const getAllHistory = async (token: string) => {
  try {
    const response = await baseURL.get("/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }
};

export const createHistory = async (token: string | null, data: any) => {
  try {
    const res = await baseURL.post(
      "/history",
      {
        title: data.title,
        description: data.description,
        userId: data.userId,
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
    window.location.reload();
    return res.data;
  } catch (err: any) {
    return err.request.status;
  }
};

export const editHistory = async (
  id: string,
  { title, description }: { title: string; description: string },
  token: string
) => {
  console.log("id", id);
  try {
    const response = await baseURL.put(
      `history/${id}`,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch post", error);
  }
};

export const deleteHistory = async (id: string, token: string) => {
  try {
    const response = await baseURL.delete(`history/${id}`, {
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
