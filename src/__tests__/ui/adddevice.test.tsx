import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../test-utils";
import { AddDevice } from "../../ui";

describe("AddDevice component", () => {
  it("should render UI properly", () => {
    renderWithProviders(<AddDevice />);
    expect(screen.getByText("Devices")).toBeInTheDocument();
    expect(screen.getByText("Add device")).toBeInTheDocument();
  });
});
