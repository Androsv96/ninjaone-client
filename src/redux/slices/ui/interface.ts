import { DEVICE } from "../devices/interfaces";

export type ACTIONS_TO_PERFORM = "edit" | "delete" | "add";

export interface PERFORM_ACTION {
  action: ACTIONS_TO_PERFORM;
  selectedDevice: DEVICE;
}

export interface UI_SLICE_INITIAL_STATE {
  showModal: boolean;
  actionToPerform: ACTIONS_TO_PERFORM;
  selectedDevice: DEVICE;
}
