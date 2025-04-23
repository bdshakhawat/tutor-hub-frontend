import { baseApi } from "./api/baseApi";
import serviceSlice from "./features/service/serviceSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  service: serviceSlice
};
