import { Access_Level_enum } from "./enums";

export const isAdmin = (user: any) => {
  if (user == null) return false;
  return user.access_level == Access_Level_enum.ADMIN;
};
