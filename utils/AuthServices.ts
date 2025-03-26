/* eslint-disable @typescript-eslint/no-explicit-any */
import { instance } from "@/axios/axiosInstance";
import { getBaseUrl } from "@/config/envConfig";
import { decodeToken } from "./jwt";

export const getUserInfo = async (userType: string, token: string) => {
  return await instance({
    url: `${getBaseUrl()}/${userType}/profile`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const getUserRoleFromLocal = (token: string) => {
  const user: any = decodeToken(token);
  return user;
};
