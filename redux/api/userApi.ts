/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: () => ({
        url: "/user/myProfile",
        method: "GET",
      }),
      providesTags: ["userProfile"],
    }),
    updateProfile: build.mutation({
      query: (payload: any) => ({
        url: "/user/updateProfile",
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["userProfile"],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateProfileMutation } = UserApi;
