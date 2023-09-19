import {vi} from 'vitest'
import {describe, it, expect, beforeEach} from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClickableItem from '../ClickableItem';
import LittleBuddyKirby from '../../../assets/product-assets/little_buddy_kirby_front.jpg'

// setups props
const plush = {
  image: LittleBuddyKirby, 
  title: 'Little Buddy Kirby 5"H',
  price: 19.99
}

const plush2 = {
  image: LittleBuddyKirby, 
  title: 'Little Buddy Kirby 5"H',
  price: 19.9 
}

describe('Clickable Item', () => {
  describe('normal product features', () => {
    beforeEach(() => {
      render(<ClickableItem plush={plush}/>);
    })
    it('renders title', () => {
      expect(screen.getByRole('heading', {name: plush.title})).toBeInTheDocument();
    })
    it('renders image', () => {
      expect(screen.getByRole('img', {src: plush.image})).toBeInTheDocument();
    })
    it('renders price', () => {
      expect(screen.getByText(`$${plush.price}`)).toBeInTheDocument();
    })
  })

  describe('price one decimal product', () => {
    beforeEach(() => {
      render(<ClickableItem plush={plush2}/>);
    })
    it('renders two decimals places if input one decimal', () => {
      expect(screen.getByText(`$${plush2.price}0`)).toBeInTheDocument();
    })
  })
})
