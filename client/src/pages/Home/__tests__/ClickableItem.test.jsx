import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ClickableItem from "../ClickableItem";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// setups props
const plush = {
  image: "test",
  title: 'Little Buddy Kirby 5"H',
  price: 19.99,
  id: 1
};

describe("Clickable Item", () => {
  beforeEach(() => {
    const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
    render(<ClickableItem plush={plush} />, { wrapper: routerWrapper });
  });

  describe("normal product features", () => {
    it("renders title", () => {
      expect(screen.getByRole("heading", { name: plush.title })).toBeInTheDocument();
    });
    it("renders image", () => {
      expect(screen.getByRole("img", { src: plush.image })).toBeInTheDocument();
    });
    it("renders price", () => {
      expect(screen.getByText(`$${plush.price}`)).toBeInTheDocument();
    });
  });

  describe("click functionality", () => {
    it("onClick routes to product page", async () => {
      const user = userEvent.setup();
      const productCard = screen.getByTestId("product-card");
      await user.click(productCard);
      expect(window.location.pathname).toBe("/products/" + plush.id);
    });
  });
});
