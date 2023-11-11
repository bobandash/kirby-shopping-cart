import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// setups props
describe("Cart", () => {
  describe("DOM", () => {
    it("empty cart matches snapshot", () => {
      const cartItems = [];
      const handleRemoveItem = vi.fn();
      const handleChangeQuantity = vi.fn();
      const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
      const { container } = render(
        <Cart
          cartItems={cartItems}
          handleRemoveItem={handleRemoveItem}
          handleChangeQuantity={handleChangeQuantity}
        />,
        { wrapper: routerWrapper }
      );
      expect(container).toMatchSnapshot();
    });

    it("cart with items matches snapshot", () => {
      const mockCartItems = [
        {
          quantity: 1,
          price: 1.1,
          title: "Test",
          image: "test",
          id: 1
        },
        {
          quantity: 50,
          price: 1.1,
          title: "Test",
          image: "test",
          id: 2
        }
      ];
      const handleRemoveItem = vi.fn();
      const handleChangeQuantity = vi.fn();
      const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
      const { container } = render(
        <Cart
          cartItems={mockCartItems}
          handleRemoveItem={handleRemoveItem}
          handleChangeQuantity={handleChangeQuantity}
        />,
        { wrapper: routerWrapper }
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("empty cart", () => {
    beforeEach(() => {
      const cartItems = [];
      const handleRemoveItem = vi.fn();
      const handleChangeQuantity = vi.fn();
      const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
      render(
        <Cart
          cartItems={cartItems}
          handleRemoveItem={handleRemoveItem}
          handleChangeQuantity={handleChangeQuantity}
        />,
        { wrapper: routerWrapper }
      );
    });
    it("has button to redirect to shop all", async () => {
      const button = screen.getByRole("button", { name: /Shop All Products/i });
      const user = userEvent.setup();
      await user.click(button);
      expect(window.location.pathname).toBe("/category/all");
    });
  });

  describe("price", () => {
    it("price is correctly displayed for one item", () => {
      const mockCartItems = [
        {
          quantity: 2,
          price: 1.1,
          title: "Test",
          image: "test",
          id: 1
        }
      ];
      const handleRemoveItem = vi.fn();
      const handleChangeQuantity = vi.fn();
      const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
      render(
        <Cart
          cartItems={mockCartItems}
          handleRemoveItem={handleRemoveItem}
          handleChangeQuantity={handleChangeQuantity}
        />,
        { wrapper: routerWrapper }
      );
      // shows the total price twice
      expect(screen.getAllByText(/2.20/i).length).toBe(2);
    });

    it("prices are displayed correctly for multiple items", () => {
      const mockCartItems = [
        {
          quantity: 2,
          price: 1.1,
          title: "Test",
          image: "test",
          id: 1
        },
        {
          quantity: 2,
          price: 5.6,
          title: "Test",
          image: "test",
          id: 1
        }
      ];
      const handleRemoveItem = vi.fn();
      const handleChangeQuantity = vi.fn();
      const routerWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
      render(
        <Cart
          cartItems={mockCartItems}
          handleRemoveItem={handleRemoveItem}
          handleChangeQuantity={handleChangeQuantity}
        />,
        { wrapper: routerWrapper }
      );
      expect(screen.getByText("$2.20")).toBeInTheDocument();
      expect(screen.getByText("$11.20")).toBeInTheDocument();
      expect(screen.getByText("Total: $13.40")).toBeInTheDocument();
    });
  });
});
