// redux/api/subjectApi.ts
import { IMeta, IService } from "@/types";
import { baseApi } from "./baseApi";

const SERVICE = "/subjects";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleService: build.query({
      query: (id: string) => ({
        url: `${SERVICE}/single-subject/${id}`,
        method: "GET",
      }),
      providesTags: ["subject", "reviews"],
    }),

    getServices: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${SERVICE}/allsubjects`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: ["subject", "reviews"],
    }),

    createService: build.mutation({
      query: (service) => ({
        url: `${SERVICE}/add-service`,
        method: "POST",
        data: service,
      }),
      invalidatesTags: ["service"],
    }),

    updateService: build.mutation({
      query: ({ id, ...service }) => ({
        url: `${SERVICE}/update-service/${id}`,
        method: "PATCH",
        data: service,
      }),
      invalidatesTags: ["service"],
    }),

    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useGetSingleServiceQuery,
  useGetServicesQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation
} = serviceApi;



// import { IMeta, IService } from "@/types";
// import { baseApi } from "./baseApi";

// const SERVICE = "/services";

// export const serviceApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     getSingleService: build.query({
//       query: (id: string) => ({
//         url: `${SERVICE}/${id}`,
//         method: "GET",
//       }),
//       providesTags: ["service", "reviews"],
//     }),

//     getServices: build.query({
//       query: (arg: Record<string, any>) => {
//         return {
//           url: SERVICE,
//           method: "GET",
//           params: arg,
//         };
//       },
//       transformResponse: (response: IService[], meta: IMeta) => {
//         return {
//           services: response,
//           meta,
//         };
//       },
//       providesTags: ["service", "reviews"],
//     }),

//     createService: build.mutation({
//       query: (service) => ({
//         url: `${SERVICE}/add-service`,
//         method: "POST",
//         data: service,
//       }),
//       invalidatesTags: ["service"],
//     }),

//     updateService: build.mutation({
//       query: ({ id, ...service }) => ({
//         url: `${SERVICE}/update-service/${id}`,
//         method: "PATCH",
//         data: service,
//       }),
//       invalidatesTags: ["service"],
//     }),

//     deleteService: build.mutation({
//       query: (id) => ({
//         url: `${SERVICE}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["service"],
//     }),
//   }),
// });

// export const {
//   useGetSingleServiceQuery,
//   useGetServicesQuery,
//   useCreateServiceMutation,
//   useDeleteServiceMutation,
//   useUpdateServiceMutation
// } = serviceApi;
