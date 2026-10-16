import baseURL from "@/environments/baseURL";
import { adminUserType } from "@/types/user.types";

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

    return res.data;
  } catch (err: any) {
    return err.request.status;
  }
};

const auth = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const rejectPost = async (id: string, reason: string, token: string) => {
  await baseURL.put(`/admin/posts/${id}/reject`, { reason }, auth(token));
};

export const getAdminUsers = async (token: string) => {
  const res = await baseURL.get<adminUserType[]>("/admin/users", auth(token));
  return res.data;
};

export const setUserRole = async (
  id: string,
  access_level: adminUserType["access_level"],
  token: string
) => {
  await baseURL.patch(`/admin/users/${id}/role`, { access_level }, auth(token));
};

export const deleteUserAsAdmin = async (id: string, token: string) => {
  await baseURL.delete(`/admin/users/${id}`, auth(token));
};

// Mensagem de erro amigável vinda da API (ex.: "Rebaixe o administrador...")
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiErrorMessage = (err: any, fallback: string) =>
  typeof err?.response?.data?.message === "string"
    ? err.response.data.message
    : fallback;
