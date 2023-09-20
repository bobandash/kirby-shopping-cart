import {describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from "@testing-library/react";
import MobileSideBar from '../Mobile-Sidebar';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// setups props
describe('Footer', () => {
  describe('DOM', () => {
    it("matches snapshot", () => {
      const routerWrapper = ({children}) => <BrowserRouter>{children}</BrowserRouter>
      const {container} = render(<MobileSideBar/>, {wrapper: routerWrapper});
      expect(container).toMatchSnapshot();
    })
  })

  // note: the rest of the links don't do anything
  describe('Footer Links', () => {
    beforeEach(() => {
      const routerWrapper = ({children}) => <BrowserRouter>{children}</BrowserRouter>
      render(<MobileSideBar />, {wrapper: routerWrapper});      
    })

    it('Shop All works', async () => {
      const link = screen.getByRole("link", {name: "Shop All"});
      expect(link).toBeInTheDocument();
      const user = userEvent.setup();
      await user.click(link);
      expect(window.location.pathname).toBe('/category/all');
    })

    it('Games works', async () => {
      const link = screen.getByRole("link", {name: "Games"});
      expect(link).toBeInTheDocument();
      const user = userEvent.setup();
      await user.click(link);
      expect(window.location.pathname).toBe('/category/games');
    })
    
    it('Plushies works', async () => {
      const link = screen.getByRole("link", {name: "Plushies"});
      expect(link).toBeInTheDocument();
      const user = userEvent.setup();
      await user.click(link);
      expect(window.location.pathname).toBe('/category/plushies');
    })

    it('Keychains works', async () => {
      const link = screen.getByRole("link", {name: "Keychains"});
      expect(link).toBeInTheDocument();
      const user = userEvent.setup();
      await user.click(link);
      expect(window.location.pathname).toBe('/category/keychains');
    }) 
  })
})