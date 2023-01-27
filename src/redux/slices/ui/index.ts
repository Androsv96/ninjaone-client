import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PERFORM_ACTION, UI_SLICE_INITIAL_STATE } from "./interface";

const initialState: UI_SLICE_INITIAL_STATE = {
  showModal: false,
  actionToPerform: "add",
  selectedDevice: {
    hdd_capacity: "",
    id: "",
    system_name: "",
    type: "WINDOWS",
  },
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    setActionToPerform(state, action: PayloadAction<PERFORM_ACTION>) {
      state.actionToPerform = action.payload.action;
      state.selectedDevice = action.payload.selectedDevice;
    },
  },
});

const { actions, reducer } = uiSlice;
export const { setShowModal, setActionToPerform } = actions;

export default reducer;
