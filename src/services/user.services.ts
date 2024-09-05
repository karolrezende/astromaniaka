import baseURL from "@/environments/baseURL";
import {
  userPassword,
  userRegister,
  userWithoutPassword,
} from "@/types/user.types";

export const getAllUser = async () => {
  try {
    const res = await baseURL.get("/users");

    if (res.status !== 200 && res.status !== 201) {
      return res.status;
    }

    console.log("res", res);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.request.status;
  }
};
export const getUserById = async (id: string) => {
  try {
    const res = await baseURL.get(`/users/user/${id}`);

    if (res.status !== 200 && res.status !== 201) {
      return res.status;
    }

    console.log("res", res);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.request.status;
  }
};

export const registerUser = async (data: userRegister) => {
  try {
    const res = await baseURL.post("/users", {
      name: data.name,
      email: data.email,
      password: data.password,
      picture: data.picture,
    });

    if (res.status != 201) {
      return res.status;
    }

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.request.status;
  }
};

export const editUser = async (
  id: string,
  {
    name,
    email,
    description,
  }: {
    name: string | undefined;
    email: string | undefined;
    description: string | undefined;
  },
  token: string
) => {
  try {
    const response = await baseURL.put<userWithoutPassword>(
      `users/${id}`,
      {
        name,
        email,
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

export const editPassword = async (data: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await baseURL.post<userPassword>(`users/password`, {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch post", error);
  }
};

export const deleteUser = async (id: string, token: string) => {
  try {
    const response = await baseURL.delete(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch post", error);
  }
};
