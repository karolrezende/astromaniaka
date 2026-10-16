import baseURL from "@/environments/baseURL";
import {
  userPassword,
  userRegister,
  userWithoutPassword,
} from "@/types/user.types";

export const getAllUser = async (token: string) => {
  try {
    const res = await baseURL.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
export const getUserById = async (id: string, token: string) => {
  try {
    const res = await baseURL.get(`/users/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

// Troca a senha do usuário logado. Lança o erro do axios para a página
// diferenciar senha atual incorreta (401) de outros problemas.
export const editPassword = async (data: userPassword, token: string) => {
  const response = await baseURL.post(
    `users/password`,
    {
      currentPassword: data.currentPassword,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
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
