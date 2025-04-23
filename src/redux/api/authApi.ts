import { IMeta, IUserProfile } from "@/types";
import { baseApi } from "./baseApi";
// const BASE_URL = "http://localhost:5000/api/v1";
const AUTH_URL = "/auth";
const USER_URL = "/users";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignup: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["user"],
    }),
    userlogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["user"],
    }),

    getSingleUser: build.query({
      query: (id: string) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    getAllUsers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${USER_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUserProfile[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: ["user"],
    }),

    roleChange: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/change-role/${data?.id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    updateUser: build.mutation({
      query: ({id, ...userData}) => ({
        url: `${USER_URL}/${id}`,
        method: "PATCH",
        data: userData
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUserSignupMutation,
  useUserloginMutation,
  useGetAllUsersQuery,
  useRoleChangeMutation,
  useDeleteUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation
} = authApi;
