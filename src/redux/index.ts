import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./slices/ui";
import devicesSlice from "./slices/devices";

const store = configureStore({
  reducer: {
    uiSlice,
    devicesSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
