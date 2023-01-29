import { waitFor } from "@testing-library/react";
import uiSlice, {
  initialState as uiSliceInitialState,
  setActionToPerform,
  setShowModal,
} from "../../redux/slices/ui";

describe("Redux ui slice", () => {
  it("should return initial state for ui slice", async () => {
    await waitFor(() =>
      expect(uiSlice(undefined, { type: undefined })).toEqual(
        uiSliceInitialState
      )
    );
  });

  it("should update state when setShowModal is dispatched", () => {
    expect(uiSlice(uiSliceInitialState, setShowModal(true))).toEqual({
      ...uiSliceInitialState,
      showModal: true,
    });
  });

  it("should update state when setActionToPerform is dispatched", () => {
    expect(
      uiSlice(
        uiSliceInitialState,
        setActionToPerform({
          action: "edit",
          selectedDevice: {
            hdd_capacity: "100",
            id: "test",
            system_name: "Testing",
            type: "MAC",
          },
        })
      )
    ).toEqual({
      ...uiSliceInitialState,
      actionToPerform: "edit",
      selectedDevice: {
        hdd_capacity: "100",
        id: "test",
        system_name: "Testing",
        type: "MAC",
      },
    });
  });
});
