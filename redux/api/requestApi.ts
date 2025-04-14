/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const RequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRequest: build.mutation({
      query: (payload: any) => ({
        url: "/request/createRequest",
        method: "POST",
        data: payload,
      }),
    }),
    getOwnerAllRequest: build.query({
      query: () => ({
        url: "/request/ownerAllRequest",
        method: "GET",
      }),
    }),
    getTenantAllRequest: build.query({
      query: (params) => ({
        url: "/request/tenantAllRequest",
        method: "GET",
        params: params,
      }),
    }),
    getRequestDetails: build.query({
      query: (id: string) => ({
        url: `/request/details/${id}`,
        method: "GET",
      }),
    }),
    updateRequestStatus: build.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `/request/update/${id}`,
        method: "PATCH",
        data: payload,
      }),
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useGetOwnerAllRequestQuery,
  useGetTenantAllRequestQuery,
  useGetRequestDetailsQuery,
  useUpdateRequestStatusMutation,
} = RequestApi;
