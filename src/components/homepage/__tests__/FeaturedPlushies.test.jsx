import FeaturedPlushies from "../FeaturedPlushies";
import {render} from "@testing-library/react";
import { describe, it, expect } from 'vitest';

describe('Featured Plushies Component', () => {
  it('renders featured plushies component', () => {
    const { container } = render(<FeaturedPlushies />);
    expect( container ).toMatchSnapshot();
  })
})