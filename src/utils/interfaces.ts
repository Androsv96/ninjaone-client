export type DEVICE_TYPES = "WINDOWS" | "MAC" | "LINUX";

export interface DEVICE {
  id: string;
  system_name: string;
  type: DEVICE_TYPES;
  hdd_capacity: string;
}
