import styles from "./Cart.module.css"
import PropTypes from 'prop-types'

//TO-DO: add checkout button functionality
// add error in case customer enters negative quantity
function CartItemsFooter({totalPrice}){
  return (
    <section className = {styles["cart-item-footer"]}>
      <div className = {styles["footer-contents"]}>
        <h1>Total: ${totalPrice.toFixed(2)}</h1>
        <button>Checkout<i className="fa-solid fa-arrow-right"></i></button>
      </div>
    </section>
  )
}

CartItemsFooter.propTypes = {
  totalPrice: PropTypes.number,
}

export default CartItemsFooter;