export type DEVICE_TYPES = "WINDOWS" | "MAC" | "LINUX" | "";
export type SORT_TYPES = "hdd_capacity" | "name";
export type FILTER_TYPES = "ALL" | "WINDOWS" | "MAC" | "LINUX";

export interface DEVICE {
  id: string;
  system_name: string;
  type: DEVICE_TYPES;
  hdd_capacity: string;
}

export interface DEVICES_SLICE_INITIAL_STATE {
  devices: DEVICE[];
  refetchDevices: boolean;
  filteredDevices: DEVICE[];
  sortBy: SORT_TYPES;
  filterBy: FILTER_TYPES;
}
