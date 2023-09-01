import FeaturedGames from "../FeaturedGames";
import {render} from "@testing-library/react";
import { describe, it, expect } from 'vitest';

describe('Featured Games Component', () => {
  it('renders featured games component', () => {
    const { container } = render(<FeaturedGames />);
    expect(container).toMatchSnapshot();
  })
})