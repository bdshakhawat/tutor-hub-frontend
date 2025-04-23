import { baseApi } from "./baseApi";
const URL = "/tutors";

export const tutorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTutor: build.mutation({
      query: (data) => ({
        url: `${URL}/create-tutor`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["tutor"],
    }),
  }),
});

export const { useCreateTutorMutation } = tutorApi;
