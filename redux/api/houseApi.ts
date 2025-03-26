import { baseApi } from "./baseApi";

const houseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getJobs: build.query({
      query: (arg) => ({
        url: "/houses",
        method: "GET",
        params: arg,
      }),
      providesTags: ["houses"],
    }),
  }),
});

export const { useGetJobsQuery } = houseApi;
