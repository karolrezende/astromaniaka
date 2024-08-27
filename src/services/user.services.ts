import baseURL from "@/environments/baseURL";
import {
  userPassword,
  userRegister,
  userWithoutPassword,
} from "@/types/user.types";

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
  { name, email }: { name: string | undefined; email: string | undefined },
  token: string
) => {
  try {
    const response = await baseURL.put<userWithoutPassword>(
      `users/${id}`,
      {
        name,
        email,
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
