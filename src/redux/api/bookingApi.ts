
import { IBooking, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBooking: build.mutation({
      query: (data) => ({
        url: `${URL}/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),

    getSingleBooking: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    getBookingByUserId: build.query({
      query: (params) => ({
        url: `${URL}/user/${params.id}`,
        method: "GET",
        params: params.arg, // Pass only the query params
      }),
      transformResponse: (response: any) => {
        return {
          data: response.data || [], // Match your actual API response
          meta: response.meta || {},
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
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          bookings: response.data || [],
          meta: response.meta || {},
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



// import { IBooking, IMeta } from "@/types";
// import { baseApi } from "./baseApi";

// const URL = "/bookings";

// export const bookingApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({

//     addBooking: build.mutation({
//       query: (data) => ({
//         url: `${URL}/add`,
//         method: "POST",
//         body: data, // <-- fixed here (was `data: data`)
//       }),
//       invalidatesTags: ["booking"],
//     }),

//     getSingleBooking: build.query({
//       query: (id) => ({
//         url: `${URL}/${id}`,
//         method: "GET",
//       }),
//       providesTags: ["booking"],
//     }),

//     getBookingByUserId: build.query({
//       query: ({ id, arg }) => ({
//         url: `${URL}/user/${id}`,  // <-- fixed the URL
//         method: "GET",
//         params: arg,
//       }),
//       transformResponse: (response: any) => {
//         return {
//           services: response?.data || [], // safer
//           meta: response?.meta || {},     // safer
//         };
//       },
//       providesTags: ["booking"],
//     }),

//     deleteBooking: build.mutation({
//       query: (id) => ({
//         url: `${URL}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["booking"],
//     }),

//     bookingStatusChange: build.mutation({
//       query: (id) => ({
//         url: `${URL}/status/${id}`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["booking"],
//     }),

//     getAllBookings: build.query({
//       query: (arg: Record<string, any>) => ({
//         url: `${URL}`,
//         method: "GET",
//         params: arg,
//       }),
//       transformResponse: (response: any) => {
//         return {
//           bookings: response?.data || [], // safer
//           meta: response?.meta || {},     // safer
//         };
//       },
//       providesTags: ["booking"],
//     }),
//   }),
// });

// export const {
//   useAddBookingMutation,
//   useGetBookingByUserIdQuery,
//   useDeleteBookingMutation,
//   useBookingStatusChangeMutation,
//   useGetAllBookingsQuery,
//   useGetSingleBookingQuery
// } = bookingApi;




// // import { IBooking, IMeta } from "@/types";
// // import { baseApi } from "./baseApi";
// // const URL = "/bookings";

// // export const bookingApi = baseApi.injectEndpoints({
// //   endpoints: (build) => ({
// //     addBooking: build.mutation({
// //       query: (data) => ({
// //         url: `${URL}/add`,
// //         method: "POST",
// //         data: data,
// //       }),
// //       invalidatesTags: ["booking"],
// //     }),

// //     getSingleBooking: build.query({
// //       query: (id) => {
// //         return {
// //           url: `${URL}/${id}`,
// //           method: "GET",
// //         };
// //       },
// //       providesTags: ["booking"],
// //     }),

// //     getBookingByUserId: build.query({
// //       query: ({ id, arg }) => {
// //         return {
// //           url: `${URL}/${id}`,
// //           method: "GET",
// //           params: arg,
// //         };
// //       },
// //       transformResponse: (response: IBooking[], meta: IMeta) => {
// //         return {
// //           services: response,
// //           meta,
// //         };
// //       },
// //       providesTags: ["booking"],
// //     }),

// //     deleteBooking: build.mutation({
// //       query: (id) => ({
// //         url: `${URL}/${id}`,
// //         method: "DELETE",
// //       }),
// //       invalidatesTags: ["booking"],
// //     }),

// //     bookingStatusChange: build.mutation({
// //       query: (id) => ({
// //         url: `${URL}/status/${id}`,
// //         method: "PATCH",
// //       }),
// //       invalidatesTags: ["booking"],
// //     }),

// //     getAllBookings: build.query({
// //       query: (arg: Record<string, any>) => {
// //         return {
// //           url: `${URL}`,
// //           method: "GET",
// //           params: arg,
// //         };
// //       },
// //       transformResponse: (response: IBooking[], meta: IMeta) => {
// //         return {
// //           bookings: response,
// //           meta,
// //         };
// //       },
// //       providesTags: ["booking"],
// //     }),
// //   }),
// // });

// // export const {
// //   useAddBookingMutation,
// //   useGetBookingByUserIdQuery,
// //   useDeleteBookingMutation,
// //   useBookingStatusChangeMutation,
// //   useGetAllBookingsQuery,
// //   useGetSingleBookingQuery
// // } = bookingApi;
