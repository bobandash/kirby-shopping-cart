import FeaturedGames from "../FeaturedGames";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Featured Games Component", () => {
  const mockGames = [
    {
      id: 1,
      image: "test1",
      price: 1,
      title: "test1"
    },
    {
      id: 2,
      image: "test2",
      price: 2,
      title: "test2"
    },
    {
      id: 3,
      image: "test3",
      price: 3,
      title: "test3"
    }
  ];
  describe("DOM", () => {
    it("renders featured games component", () => {
      const { container } = render(
        <BrowserRouter>
          <FeaturedGames games={mockGames} />
        </BrowserRouter>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("product carousel", () => {
    it("click right arrow button, shows next game", async () => {
      render(
        <BrowserRouter>
          <FeaturedGames games={mockGames} />
        </BrowserRouter>
      );
      const user = userEvent.setup();
      const rightArrowBtn = screen.getByRole("button", { name: /increment active game number/i });
      await user.click(rightArrowBtn);
      expect(screen.getByAltText("test2")).toBeInTheDocument();
    });

    it("click prev arrow button, shows prev game", async () => {
      render(
        <BrowserRouter>
          <FeaturedGames games={mockGames} />
        </BrowserRouter>
      );
      const user = userEvent.setup();
      const leftArrowBtn = screen.getByRole("button", { name: /decrement active game number/i });
      await user.click(leftArrowBtn);
      expect(screen.getByAltText("test3")).toBeInTheDocument();
    });

    it("click bottom button, navigate to game in the index", async () => {
      render(
        <BrowserRouter>
          <FeaturedGames games={mockGames} />
        </BrowserRouter>
      );
      const user = userEvent.setup();
      const allCircleNavBtns = screen.getAllByRole("button", { name: /circle-nav/i });
      await user.click(allCircleNavBtns[1]);
      expect(screen.getByAltText("test2")).toBeInTheDocument();
      await user.click(allCircleNavBtns[0]);
      expect(screen.getByAltText("test1")).toBeInTheDocument();
    });

    it("click game, navigate to product id page", async () => {
      render(
        <BrowserRouter>
          <FeaturedGames games={mockGames} />
        </BrowserRouter>
      );
      const user = userEvent.setup();
      const firstGame = screen.getByAltText(mockGames[0].title);
      await user.click(firstGame);
      expect(window.location.pathname).toBe("/products/" + mockGames[0].id);
    });
  });

  it("games automatically move to the next game after ", async () => {
    vi.useFakeTimers();
    render(
      <BrowserRouter>
        <FeaturedGames games={mockGames} />
      </BrowserRouter>
    );
    act(() => {
      vi.advanceTimersByTime(11000);
    });
    expect(screen.getByAltText(mockGames[1].title)).toBeInTheDocument();
  });
});
