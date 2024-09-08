/* eslint-disable @typescript-eslint/no-explicit-any */
import baseURL from "@/environments/baseURL";

export const registerAstronomer = async (data: any, token: string) => {
  try {
    const res = await baseURL.post(
      "/astronomer",
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status != 201 && res.status != 200) {
      return res.status;
    }
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.request.status;
  }
};
export const getAllAstronomers = async (token: string) => {
  try {
    const res = await baseURL.get(
      "/astronomer",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status != 201 && res.status != 200) {
      return res.status;
    }
    
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.request.status;
  }
};


export const postUserAstronomer = async(token:string, data:any) => {
    try {
    const res = await baseURL.post(
      "/astronomer/user",
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status != 201 && res.status != 200) {
      return res.status;
    }
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.request.status;
  }
}
export const removeUserAstronomer = async (token: string, data: any) => {
  try {
    const res = await baseURL.delete(`/astronomer/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        astronomerId: data.astronomerId,
        userId: data.userId
      }
    });

    return res.status != 204 ? res.status : 204;
  } catch (err: any) {
    return err.request?.status || 500;
  }
}