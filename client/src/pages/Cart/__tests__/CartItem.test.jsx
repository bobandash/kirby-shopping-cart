import CartItem from "../CartItem";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Cart Item", () => {
  describe("qty < 30", () => {
    it("if select a number, handle quantity function is called", async () => {
      const item = {
        quantity: 10,
        price: 1.1,
        title: "Test",
        image: "test",
        id: 1
      };
      const handleChangeQuantity = vi.fn();
      const user = userEvent.setup();
      render(<CartItem item={item} handleChangeQuantity={handleChangeQuantity} />);
      const selectBox = screen.getByTestId("select-quantity");
      const selectOption = screen.getByRole("option", { name: "20" });
      await user.selectOptions(selectBox, selectOption);
      expect(handleChangeQuantity).toBeCalledTimes(1);
    });
  });

  describe("qty > 30", () => {
    it("typing into the input box displays update and cancel button", async () => {
      const item = {
        quantity: 40,
        price: 1.1,
        title: "Test",
        image: "test",
        id: 1
      };
      const handleChangeQuantity = vi.fn();
      const user = userEvent.setup();
      render(<CartItem item={item} handleChangeQuantity={handleChangeQuantity} />);
      const inputBox = screen.getByTestId("input-quantity");
      await user.clear(inputBox);
      await user.type(inputBox, "60");
      expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    });

    it("cancel button clicked does not change quantity", async () => {
      const item = {
        quantity: 50,
        price: 1.1,
        title: "Test",
        image: "test",
        id: 1
      };
      const handleChangeQuantity = vi.fn();
      const user = userEvent.setup();
      render(<CartItem item={item} handleChangeQuantity={handleChangeQuantity} />);
      const inputBox = screen.getByTestId("input-quantity");
      await user.clear(inputBox);
      await user.type(inputBox, "60");
      const cancelBtn = screen.getByRole("button", { name: "Cancel" });
      cancelBtn.click();
      expect(handleChangeQuantity).toBeCalledTimes(0);
    });

    it("update button clicked does not change quantity", async () => {
      const item = {
        quantity: 50,
        price: 1.1,
        title: "Test",
        image: "test",
        id: 1
      };
      const handleChangeQuantity = vi.fn();
      const user = userEvent.setup();
      render(<CartItem item={item} handleChangeQuantity={handleChangeQuantity} />);
      const inputBox = screen.getByTestId("input-quantity");
      await user.clear(inputBox);
      await user.type(inputBox, "60");
      const updateBtn = screen.getByRole("button", { name: "Update" });
      updateBtn.click();
      expect(handleChangeQuantity).toBeCalledTimes(1);
    });
  });
});
