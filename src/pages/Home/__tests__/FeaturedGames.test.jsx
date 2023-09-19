import { createMemoryHistory } from "@remix-run/router";
import FeaturedGames from "../FeaturedGames";
import {render} from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from "react-router-dom";

describe('Featured Games Component', () => {
  const mockGames = [
    {
      id: 1,
      image: "test"
    },
    {
      id: 2,
      image: "test"
    },
    {
      id: 3,
      image: "test"
    }
  ]

  it('renders featured games component', () => {
    const { container } = render(
    <BrowserRouter>
      <FeaturedGames games = {mockGames} />
    </BrowserRouter>);
    expect(container).toMatchSnapshot();
  })
})