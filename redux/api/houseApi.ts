import { baseApi } from "./baseApi";

const houseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myHouses: build.query({
      query: (arg) => ({
        url: "/house",
        method: "GET",
        params: arg,
      }),
      providesTags: ["houses"],
    }),
    getHouses: build.query({
      query: (arg) => ({
        url: "/house",
        method: "GET",
        params: arg,
      }),
    }),
    getSingleHouseDetails: build.query({
      query: (arg) => ({
        url: `/house/single/${arg?.id}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["houses"],
    }),
    createHouse: build.mutation({
      query: (arg) => ({
        url: "/houses",
        method: "POST",
        params: arg,
      }),
      invalidatesTags: ["houses"],
    }),

    deleteHouse: build.mutation({
      query: (arg) => ({
        url: `/house/delete/${arg?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["houses"],
    }),
    deleteHouseImage: build.mutation({
      query: (arg) => ({
        url: `/house/deleteHouseImage/${arg?.imageId}/${arg?.houseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["houses"],
    }),
    updateHouseInfo: build.mutation({
      query: (arg) => ({
        url: `/house/updateInfo/${arg?.houseId}`,
        method: "PATCH",
        data: arg.data,
      }),
      invalidatesTags: ["houses"],
    }),
  }),
});

export const {
  useGetHousesQuery,
  useCreateHouseMutation,
  useDeleteHouseMutation,
  useGetSingleHouseDetailsQuery,
  useDeleteHouseImageMutation,
  useUpdateHouseInfoMutation,
  useMyHousesQuery,
} = houseApi;
