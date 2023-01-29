import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  DEVICE,
  DEVICES_SLICE_INITIAL_STATE,
  FILTER_TYPES,
  SORT_TYPES,
} from "./interfaces";
import { filterDevices, sortDescending } from "../../../utils/functions";

const initialState: DEVICES_SLICE_INITIAL_STATE = {
  devices: [],
  sortBy: "hdd_capacity",
  filteredDevices: [],
  refetchDevices: false,
  filterBy: "ALL",
};

const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState,
  reducers: {
    setDevices(state, action: PayloadAction<DEVICE[]>) {
      const newDevices = action.payload;
      state.devices = newDevices;
      state.filteredDevices = filterDevices(newDevices, state.filterBy);
      state.filteredDevices = sortDescending(newDevices, state.sortBy);
    },
    setRefetchDevices(state, action: PayloadAction<boolean>) {
      state.refetchDevices = action.payload;
    },
    setSortBy(state, action: PayloadAction<SORT_TYPES>) {
      const newDevices = [...state.devices];
      state.filteredDevices = sortDescending(newDevices, action.payload);
      state.sortBy = action.payload;
    },
    setFilterBy(state, action: PayloadAction<FILTER_TYPES>) {
      state.filterBy = action.payload;
      state.filteredDevices = filterDevices(state.devices, state.filterBy);
      state.filteredDevices = sortDescending(
        state.filteredDevices,
        state.sortBy
      );
    },
  },
});

const { actions, reducer } = deviceSlice;
export const { setDevices, setRefetchDevices, setSortBy, setFilterBy } =
  actions;

export default reducer;
