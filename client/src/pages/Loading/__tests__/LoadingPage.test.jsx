import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LoadingScreen from "../LoadingPage";

// setups props
describe("Loading Screen", () => {
  it("matches snapshot", () => {
    const { container } = render(<LoadingScreen />);
    expect(container).toMatchSnapshot();
  });
});
