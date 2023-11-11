import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Header1 from "../Header";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// setups props
describe("Header", () => {
  const mockCartItems = [
    {
      item: "test",
      quantity: 1
    },
    {
      item: "test2",
      quantity: 10
    }
  ];

  describe("DOM", () => {
    it("matches snapshot", () => {
      const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
      const { container } = render(<Header1 cartItems={mockCartItems} />, {
        wrapper: routerWrapper
      });
      expect(container).toMatchSnapshot();
    });
  });

  describe("Header Links", () => {
    beforeEach(() => {
      const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
      render(<Header1 cartItems={mockCartItems} />, { wrapper: routerWrapper });
    });

    it("kirby logo redirects to home page", async () => {
      const kirbyLogo = screen.getByAltText("Kirby Logo");
      expect(kirbyLogo).toBeInTheDocument();
      const user = userEvent.setup();
      await user.click(kirbyLogo);
      expect(window.location.pathname).toBe("/");
    });

    it("cart icon redirects to cart", async () => {
      const cartIcon = screen.getByAltText("Cart");
      expect(cartIcon).toBeInTheDocument();
      const user = userEvent.setup();
      await user.click(cartIcon);
      expect(window.location.pathname).toBe("/cart");
    });
  });

  describe("cart quantity updates", async () => {
    it("empty cart", () => {
      const emptyCart = [];
      const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
      render(<Header1 cartItems={emptyCart} />, { wrapper: routerWrapper });
      const cartIcon = screen.getByAltText("Empty Cart");
      expect(cartIcon).toBeInTheDocument();
    });

    it("less than 99 quantity cart", () => {
      const cartItemsLessThan99 = [
        {
          item: "test",
          quantity: 1
        },
        {
          item: "test2",
          quantity: 10
        }
      ];
      const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
      render(<Header1 cartItems={cartItemsLessThan99} />, { wrapper: routerWrapper });
      const cartAmount = screen.getByText(11);
      expect(cartAmount).toBeInTheDocument();
    });

    it("more than 99 quantity cart", () => {
      const cartItemsMoreThan99 = [
        {
          item: "test",
          quantity: 90
        },
        {
          item: "test",
          quantity: 50
        }
      ];
      const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
      render(<Header1 cartItems={cartItemsMoreThan99} />, { wrapper: routerWrapper });
      const cartAmount = screen.getByText("99+");
      expect(cartAmount).toBeInTheDocument();
    });
  });
});
