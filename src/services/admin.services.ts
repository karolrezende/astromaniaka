import baseURL from "@/environments/baseURL";

export const getAllPostsToAprove = async (token: string) => {
  try {
    const res = await baseURL.get("/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status != 200) {
      return res.status;
    }

    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return err.request.status;
  }
};
