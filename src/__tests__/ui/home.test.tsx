import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import { initialState as deviceSliceInitialState } from "../../redux/slices/devices";
import { DEVICE } from "../../redux/slices/devices/interfaces";
import { Home } from "../../ui";
import { renderWithProviders } from "../test-utils";

const devices: DEVICE[] = [
  {
    hdd_capacity: "50",
    id: "R5LdSnQhY",
    system_name: "HOME-ONE",
    type: "WINDOWS",
  },
  {
    hdd_capacity: "256",
    id: "LM5dBnJ2G",
    system_name: "MOON-SMART",
    type: "WINDOWS",
  },
];

describe("Home component", () => {
  it("should render devices", async () => {
    renderWithProviders(<Home />, {
      ...deviceSliceInitialState,
      devices,
      filteredDevices: devices,
    });

    expect(screen.getByText(devices[0].system_name)).toBeInTheDocument();
    expect(screen.getByText(devices[1].system_name)).toBeInTheDocument();
  });

  it("should show options icon when device row is selected", async () => {
    renderWithProviders(<Home />, {
      ...deviceSliceInitialState,
      devices,
      filteredDevices: devices,
    });
    userEvent.click(screen.getByText(devices[0].system_name));

    await waitFor(() => {
      expect(screen.getByAltText("dotsImg")).toBeInTheDocument();
    });
  });

  it("should display options to perform when option icon is selected", async () => {
    renderWithProviders(<Home />, {
      ...deviceSliceInitialState,
      devices,
      filteredDevices: devices,
    });
    userEvent.click(screen.getByText(devices[0].system_name));
    userEvent.click(screen.getByAltText("dotsImg"));

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should show modal with the selected device data", async () => {
    renderWithProviders(<Home />, {
      ...deviceSliceInitialState,
      devices,
      filteredDevices: devices,
    });
    userEvent.click(screen.getByText(devices[0].system_name));
    userEvent.click(screen.getByAltText("dotsImg"));
    userEvent.click(screen.getByText("Edit"));

    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getByText(devices[0].system_name)).toBeInTheDocument();
  });
});
