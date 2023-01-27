import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEVICE, DEVICES_SLICE_INITIAL_STATE } from "./interfaces";

const initialState: DEVICES_SLICE_INITIAL_STATE = {
  devices: [],
  refetchDevices: false,
};

const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState,
  reducers: {
    setDevices(state, action: PayloadAction<DEVICE[]>) {
      state.devices = action.payload;
    },
    setRefetchDevices(state, action: PayloadAction<boolean>) {
      state.refetchDevices = action.payload;
    },
  },
});

const { actions, reducer } = deviceSlice;
export const { setDevices, setRefetchDevices } = actions;

export default reducer;
