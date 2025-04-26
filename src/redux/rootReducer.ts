import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from "./api/baseApi";
import authReducer from "./features/Auth/authSlice";
import serviceReducer from "./features/service/serviceSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  service: serviceReducer,
  auth: authReducer,
});

export default rootReducer;



// import { baseApi } from "./api/baseApi";
// import { authSlice } from "./features/Auth/authSlice";
// import serviceSlice from "./features/service/serviceSlice";

// export const reducer = {
//   [baseApi.reducerPath]: baseApi.reducer,
//   service: serviceSlice,
//   auth: authSlice,
// };
