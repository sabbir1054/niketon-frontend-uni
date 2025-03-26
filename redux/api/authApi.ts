import { ILoginInput } from "@/types/AuthTypes";
import { baseApi } from "./baseApi";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload: ILoginInput) => ({
        url: "/auth/login",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = AuthApi;
