import { baseApi } from "./baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: () => ({
        url: "/user/myProfile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyProfileQuery } = UserApi;
