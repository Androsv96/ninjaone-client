import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../test-utils";
import { Filters } from "../../ui";

describe("Filter component", () => {
  it("should render UI properly", () => {
    renderWithProviders(<Filters />);

    expect(screen.getByText("Device Type: All")).toBeInTheDocument();
    expect(
      screen.getByText("Sort by: HDD Capacity (Descending)")
    ).toBeInTheDocument();
    expect(screen.getByAltText("reloadImg")).toBeInTheDocument();
  });
});
