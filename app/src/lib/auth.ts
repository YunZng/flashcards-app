import { User } from "./types";
import { jwtDecode } from "jwt-decode"

export const getAuthenticatedUser = (): User => {
  const token = localStorage.getItem('token') as string;
  const decoded = jwtDecode<User>(token);
  return decoded;
};

export const getAuthenticatedUserToken = (): string | null =>  {
  return localStorage.getItem('token');
}

export const removeAuthenticatedUserToken = (): void => {
  localStorage.removeItem("token");
};

export const setAuthenticatedUserToken = (token: string) =>  {
  return localStorage.setItem('token', token);
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTimestamp = Date.now() / 1000;
    return decodedToken.exp < currentTimestamp;
  } catch (error) {
    return true;
  }
};
