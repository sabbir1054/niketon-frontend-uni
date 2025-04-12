/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginInput } from "@/types/AuthTypes";
import { baseApi } from "./baseApi";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (payload: any) => ({
        url: "/auth/register",
        method: "POST",
        data: payload,
      }),
    }),
    login: build.mutation({
      query: (payload: ILoginInput) => ({
        url: "/auth/login",
        method: "POST",
        data: payload,
      }),
    }),
    forgetPassword: build.mutation({
      query: (payload: any) => ({
        url: "/auth/forgetPasswordEmailSend",
        method: "POST",
        data: payload,
      }),
    }),
    verifyOtp: build.mutation({
      query: (payload: any) => ({
        url: "/auth/forgetPasswordOTPVerify",
        method: "POST",
        data: payload,
      }),
    }),
    resetPassword: build.mutation({
      query: (payload: any) => ({
        url: "/auth/forgetPasswordSetNewPassword",
        method: "POST",
        data: payload,
      }),
    }),
    changePassword: build.mutation({
      query: (payload: any) => ({
        url: "/auth/changePassword",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = AuthApi;
