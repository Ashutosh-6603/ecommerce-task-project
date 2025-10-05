import type { User } from "../types";

export const saveAuthToStorage = (user: User, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const getAuthFromStorage = (): {
  user: User | null;
  token: string | null;
} => {
  const userStr = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  return {
    user: userStr ? JSON.parse(userStr) : null,
    token,
  };
};

export const clearAuthFromStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
