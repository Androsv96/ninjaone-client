import { DEVICE_TYPES } from "../redux/slices/devices/interfaces";

import { ACTIONS_TO_PERFORM } from "../redux/slices/ui/interface";
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

export const getActionToPerform = (actionType: ACTIONS_TO_PERFORM) => {
  switch (actionType) {
    case "add":
      return "Add Device";

    case "delete":
      return "Delete Device?";

    case "edit":
      return "Edit Device";

    default:
      return "Add Device";
  }
};

export const getMethodFromActionToPerform = (
  actionType: ACTIONS_TO_PERFORM
) => {
  switch (actionType) {
    case "add":
      return "POST";

    case "delete":
      return "DELETE";

    case "edit":
      return "PUT";

    default:
      return "GET";
  }
};
