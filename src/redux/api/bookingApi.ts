import { IBooking, IMeta } from "@/types";
import { baseApi } from "./baseApi";
const URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBooking: build.mutation({
      query: (data) => ({
        url: `${URL}/add`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["booking"],
    }),

    getSingleBooking: build.query({
      query: (id) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),

    getBookingByUserId: build.query({
      query: ({ id, arg }) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBooking[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: ["booking"],
    }),

    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
    }),

    bookingStatusChange: build.mutation({
      query: (id) => ({
        url: `${URL}/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["booking"],
    }),

    getAllBookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBooking[], meta: IMeta) => {
        return {
          bookings: response,
          meta,
        };
      },
      providesTags: ["booking"],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useGetBookingByUserIdQuery,
  useDeleteBookingMutation,
  useBookingStatusChangeMutation,
  useGetAllBookingsQuery,
  useGetSingleBookingQuery
} = bookingApi;
