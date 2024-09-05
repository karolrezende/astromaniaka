import baseURL from "@/environments/baseURL";

export const registerAstronomer = async (data: any, token: string) => {
  try {
    const res = await baseURL.post(
      "/astronomer",
      {
        data,
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

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.request.status;
  }
};
