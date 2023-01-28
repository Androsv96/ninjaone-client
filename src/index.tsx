import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import App from "./App";
import store from "../src/redux";
import "./index.css";
import CustomTheme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomTheme>
        <App />
      </CustomTheme>
    </Provider>
  </React.StrictMode>
);
