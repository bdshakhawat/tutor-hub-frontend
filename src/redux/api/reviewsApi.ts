import { IMeta, IServiceReview } from "@/types";
import { baseApi } from "./baseApi";
const URL = "/reviews";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addReview: build.mutation({
      query: (data) => ({
        url: `${URL}/add-review`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["reviews"],
    }),

    getReviews: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IServiceReview[], meta: IMeta) => {
        return {
          reviews: response,
          meta,
        };
      },
      providesTags: ["reviews"],
    }),

    getReviewsByCourseId: build.query({
      query: ({ id, arg }) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IServiceReview[], meta: IMeta) => {
        return {
          reviews: response,
          meta,
        };
      },
      providesTags: ["reviews"],
    }),

    deleteReview: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
    useAddReviewMutation,
    useGetReviewsQuery,
    useGetReviewsByCourseIdQuery,
    useDeleteReviewMutation
} = reviewsApi;
