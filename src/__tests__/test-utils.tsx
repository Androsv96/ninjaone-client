import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import type { AppStore, RootState } from "../redux";

import devicesSlice, {
  initialState as devicesSliceInitialState,
} from "../redux/slices/devices";
import uiSlice, {
  initialState as uiSliceInitialState,
} from "../redux/slices/ui";
import { DEVICES_SLICE_INITIAL_STATE } from "../redux/slices/devices/interfaces";
import { UI_SLICE_INITIAL_STATE } from "../redux/slices/ui/interface";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  customDevicesSlice: DEVICES_SLICE_INITIAL_STATE = devicesSliceInitialState,
  customUiSlice: UI_SLICE_INITIAL_STATE = uiSliceInitialState,
  {
    preloadedState = {
      devicesSlice: customDevicesSlice,
      uiSlice: customUiSlice,
    },
    store = configureStore({
      reducer: { uiSlice, devicesSlice },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
