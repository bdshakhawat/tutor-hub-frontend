import { baseApi } from "./baseApi";
const URL = "/orders";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    paymentOrder: build.mutation({
      query: (paymentData) => ({
        url: `${URL}/payment-order`,
        method: "POST",
        data: paymentData,
      }),
      invalidatesTags: ["order"],
    }),

    getSingleOrder: build.query({
      query: (transId: string) => ({
        url: `${URL}/by-transaction-id/${transId}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { usePaymentOrderMutation, useGetSingleOrderQuery } = orderApi;
