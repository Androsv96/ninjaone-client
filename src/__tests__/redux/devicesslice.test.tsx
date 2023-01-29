import { DEVICE } from "../../redux/slices/devices/interfaces";
import deviceSlice, {
  initialState as deviceSliceInitialState,
  setDevices,
  setSearchCriteria,
} from "../../redux/slices/devices";

describe("Redux devices slices", () => {
  it("should return initial state for device slice", () => {
    expect(deviceSlice(undefined, { type: undefined })).toEqual(
      deviceSliceInitialState
    );
  });

  it("should update state when setActionToPerform is dispatched", () => {
    const devices: DEVICE[] = [
      {
        hdd_capacity: "100",
        id: "test",
        system_name: "Testing",
        type: "LINUX",
      },
    ];
    expect(deviceSlice(deviceSliceInitialState, setDevices(devices))).toEqual({
      ...deviceSliceInitialState,
      devices,
      filteredDevices: devices,
    });
  });

  it("should sort devices by hdd_capacity descending", () => {
    const devices: DEVICE[] = [
      {
        hdd_capacity: "50",
        id: "test2",
        system_name: "Testing2",
        type: "LINUX",
      },
      {
        hdd_capacity: "100",
        id: "test",
        system_name: "Testing",
        type: "LINUX",
      },
    ];
    const updatedSlice = deviceSlice(
      deviceSliceInitialState,
      setDevices(devices)
    );
    expect(updatedSlice.filteredDevices[0].hdd_capacity).toBe("100");
  });

  it("should sort devices by name descending", () => {
    const devices: DEVICE[] = [
      {
        hdd_capacity: "50",
        id: "test2",
        system_name: "def",
        type: "LINUX",
      },
      {
        hdd_capacity: "100",
        id: "test",
        system_name: "abc",
        type: "LINUX",
      },
    ];
    const updatedSlice = deviceSlice(
      deviceSliceInitialState,
      setDevices(devices)
    );
    expect(updatedSlice.filteredDevices[0].system_name).toBe("abc");
  });

  it("should filter devices by search criteria", () => {
    const devices: DEVICE[] = [
      {
        hdd_capacity: "302",
        id: "ppRmcE9p8",
        system_name: "JACK-GUEST",
        type: "LINUX",
      },
      {
        hdd_capacity: "256",
        id: "LM5dBnJ2G",
        system_name: "MOON-SMART",
        type: "MAC",
      },
    ];
    const updatedSlice = deviceSlice(
      { ...deviceSliceInitialState, devices, filteredDevices: devices },
      setSearchCriteria("moon")
    );
    expect(updatedSlice.searchCriteria).toBe("moon");
    expect(updatedSlice.filteredDevices[0].system_name).toBe("MOON-SMART");
  });
});
