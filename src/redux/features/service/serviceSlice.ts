import type { RootState } from "@/redux/store";
import { IService } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ServiceState {
  services: IService[];
}

// Define the initial state using that type
const initialState: ServiceState = {
  services: [],
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IService>) => {
      state.services.push(action.payload);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter(
        (service) => service._id !== action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = serviceSlice.actions;

export const selectService = (state: RootState) => state.service.services;

export default serviceSlice.reducer;
