import {describe, it, expect, vi} from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import ProductPage from '../ProductPage';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


describe('Product Page', () => {
  describe('renders correctly', () => {
    it("renders product page correctly", async () => {
      global.fetch = vi.fn(() => 
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({
            image: 'test',
            title: 'Kirby plush',
            price: 50,
            description: 'test',
            id: 1
          })
        })
      )
      const cartItems = [];
      const addCartItem = vi.fn();
      render(
        <BrowserRouter>
          <ProductPage cartItems = {cartItems} addCartItem = {addCartItem} />
        </BrowserRouter>
      )
      await waitFor(() => {
        expect(screen.getByRole('button', {name: /Add to Cart/i}))
      })
    })

    it("returns error page when api call fails", async () => {
      global.fetch = vi.fn(() => Promise.reject("API failed"))
      const cartItems = [];
      const addCartItem = vi.fn();
      render(
        <BrowserRouter>
          <ProductPage cartItems = {cartItems} addCartItem = {addCartItem} />
        </BrowserRouter>
      )
      await waitFor(() => {
        expect(screen.getByText(/Error/i)).toBeInTheDocument();
      })
    })
  })

  describe('user interaction', () => {
    it("quantity input changes from select to input box when qty > 30+", async () => {
      //setup
      global.fetch = vi.fn(() => 
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({
            image: 'test',
            title: 'Kirby plush',
            price: 50,
            description: 'test',
            id: 1
          })
        })
      )
      const cartItems = [];
      const addCartItem = vi.fn();
      render(
        <BrowserRouter>
          <ProductPage cartItems = {cartItems} addCartItem = {addCartItem} />
        </BrowserRouter>
      )
      await waitFor(() => {
        expect(screen.getByRole('button', {name: /Add to Cart/i}))
      })
      // end setup
      const user = userEvent.setup();
      const selectBox = screen.getByLabelText("Quantity:", {selector: 'select'});
      const selectOption = screen.getByRole('option', {name: '30+'});
      let quantityInput = screen.queryByLabelText("Quantity:", {selector: 'input'});
      expect(quantityInput).not.toBeInTheDocument();
      await user.selectOptions(selectBox, selectOption)
      quantityInput = screen.queryByLabelText("Quantity:", {selector: 'input'});
      expect(quantityInput).toBeInTheDocument();
    })

    it("addCartItems function is called when add to cart button is clicked", async () => {
      global.fetch = vi.fn(() => 
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({
              image: 'test',
              title: 'Kirby plush',
              price: 50,
              description: 'test',
              id: 1
          })
        })
      )
      const cartItems = [];
      const addCartItem = vi.fn();
      render(
        <BrowserRouter>
          <ProductPage cartItems = {cartItems} addCartItem = {addCartItem} />
        </BrowserRouter>
      )
      await waitFor(() => {
        expect(screen.getByRole('button', {name: /Add to Cart/i}))
      })
      const user = userEvent.setup();
      const addToCartBtn = screen.getByRole('button', {name: /Add to Cart/i});
      await user.click(addToCartBtn);
      expect(addCartItem).toHaveBeenCalledTimes(1);
    })
  
    it("error message is created when user enters 0 as quantity", async () => {
      global.fetch = vi.fn(() => 
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({
              image: 'test',
              title: 'Kirby plush',
              price: 50,
              description: 'test',
              id: 1
          })
        })
      )
      const cartItems = [];
      const addCartItem = vi.fn();
      render(
        <BrowserRouter>
          <ProductPage cartItems = {cartItems} addCartItem = {addCartItem} />
        </BrowserRouter>
      )
      await waitFor(() => {
        expect(screen.getByRole('button', {name: /Add to Cart/i}))
      })
      const user = userEvent.setup();
      const selectBox = screen.getByLabelText("Quantity:", {selector: 'select'});
      const selectOption = screen.getByRole('option', {name: '30+'});
      await user.selectOptions(selectBox, selectOption)
      const quantityInput = screen.queryByLabelText("Quantity:", {selector: 'input'});
      const addToCartBtn = screen.getByRole('button', {name: /Add to Cart/i});
      await user.clear(quantityInput);
      await user.type(quantityInput, "0");
      await user.click(addToCartBtn);
      expect(screen.getByText("Invalid Quantity. Cannot Add to Cart.")).toBeInTheDocument();
    })

    it("quantity is successfully added when quantity > 0", async () => {
      global.fetch = vi.fn(() => 
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({
              image: 'test',
              title: 'Kirby plush',
              price: 50,
              description: 'test',
              id: 1
          })
        })
      )
      const cartItems = [];
      const addCartItem = vi.fn();
      render(
        <BrowserRouter>
          <ProductPage cartItems = {cartItems} addCartItem = {addCartItem} />
        </BrowserRouter>
      )
      await waitFor(() => {
        expect(screen.getByRole('button', {name: /Add to Cart/i}))
      })
      const user = userEvent.setup();
      const selectBox = screen.getByLabelText("Quantity:", {selector: 'select'});
      const selectOption = screen.getByRole('option', {name: '15'});
      await user.selectOptions(selectBox, selectOption)
      const addToCartBtn = screen.getByRole('button', {name: /Add to Cart/i});
      await user.click(addToCartBtn);
      expect(screen.getByText("Successfully added to cart.")).toBeInTheDocument();
    })  
  })
})