import { DEVICE_TYPES } from "./interfaces";

import windowsLogo from "../assets/windows.svg";
import linuxLogo from "../assets/linux.svg";
import appleLogo from "../assets/apple.svg";

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();

export const getDeviceLogo = (type: DEVICE_TYPES) => {
  switch (type) {
    case "LINUX":
      return linuxLogo;

    case "WINDOWS":
      return windowsLogo;

    case "MAC":
      return appleLogo;

    default:
      return linuxLogo;
  }
};
