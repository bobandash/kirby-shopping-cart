import FeaturedPlushies from "../FeaturedPlushies";
import {render} from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from "react-router-dom";

describe('Featured Plushies Component', () => {
  const mockPlushies = [
    {
      id: 1,
      image: "test",
      price: 5.99
    },
    {
      id: 2,
      image: "test",
      price: 5.99
    },
    {
      id: 3,
      image: "test",
      price: 5.99
    }
  ]
  it('renders featured plushies component', () => {
    const { container } = render(
    <BrowserRouter>
      <FeaturedPlushies plushies = {mockPlushies}/>
    </BrowserRouter>);
    expect( container ).toMatchSnapshot();
  })
})