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
  searchCriteria: "",
};

const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState,
  reducers: {
    setDevices(state, action: PayloadAction<DEVICE[]>) {
      const newDevices = action.payload;
      const tempNewDevices = [...newDevices];
      const filteredDevices = filterDevices(
        tempNewDevices,
        state.filterBy,
        state.searchCriteria
      );
      state.devices = newDevices;
      state.filteredDevices = sortDescending(filteredDevices, state.sortBy);
    },
    setRefetchDevices(state, action: PayloadAction<boolean>) {
      state.refetchDevices = action.payload;
    },
    setSortBy(state, action: PayloadAction<SORT_TYPES>) {
      const newDevices = [...state.filteredDevices];
      state.filteredDevices = sortDescending(newDevices, action.payload);
      state.sortBy = action.payload;
    },
    setFilterBy(state, action: PayloadAction<FILTER_TYPES>) {
      state.filterBy = action.payload;
      const tempDevices = [...state.devices];
      const filteredDevices = filterDevices(
        tempDevices,
        state.filterBy,
        state.searchCriteria
      );
      state.filteredDevices = sortDescending(filteredDevices, state.sortBy);
    },
    setSearchCriteria(state, action: PayloadAction<string>) {
      const tempDevices = [...state.devices];
      const filteredDevices = filterDevices(
        tempDevices,
        state.filterBy,
        action.payload
      );
      state.searchCriteria = action.payload;
      state.filteredDevices = sortDescending(filteredDevices, state.sortBy);
    },
  },
});

const { actions, reducer } = deviceSlice;
export const {
  setDevices,
  setRefetchDevices,
  setSortBy,
  setFilterBy,
  setSearchCriteria,
} = actions;

export default reducer;
