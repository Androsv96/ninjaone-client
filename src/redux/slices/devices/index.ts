import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEVICE, DEVICES_SLICE_INITIAL_STATE, SORT_TYPES } from "./interfaces";
import { sortDescending } from "../../../utils/functions";

const initialState: DEVICES_SLICE_INITIAL_STATE = {
  devices: [],
  sortBy: "hdd_capacity",
  filteredDevices: [],
  refetchDevices: false,
};

const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState,
  reducers: {
    setDevices(state, action: PayloadAction<DEVICE[]>) {
      const newDevices = action.payload;
      state.devices = sortDescending(newDevices, state.sortBy);
    },
    setRefetchDevices(state, action: PayloadAction<boolean>) {
      state.refetchDevices = action.payload;
    },
    setSortBy(state, action: PayloadAction<SORT_TYPES>) {
      const newDevices = [...state.devices];
      state.devices = sortDescending(newDevices, action.payload);
      state.sortBy = action.payload;
    },
  },
});

const { actions, reducer } = deviceSlice;
export const { setDevices, setRefetchDevices, setSortBy } = actions;

export default reducer;
