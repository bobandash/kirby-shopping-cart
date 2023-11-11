import LandingScreen from "../LandingScreen";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Landing Screen Component", () => {
  it("renders correctly", () => {
    const { container } = render(<LandingScreen />);
    expect(container).toMatchSnapshot();
  });
});
