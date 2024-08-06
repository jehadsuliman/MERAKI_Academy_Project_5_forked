import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    addresses: [],
  },
  reducers: {
    fetchAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    deleteAddressById: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
    },
  },
});

export const { fetchAddresses, addAddress, deleteAddressById } =
  addressSlice.actions;
export default addressSlice.reducer;
