import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import CartItemsHeader from './CartItemHeader';
import CartItemsFooter from './CartItemsFooter'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

function Cart({cartItems, handleChangeQuantity}){
  const navigate = useNavigate();
  let totalCartPrice = 0;
  cartItems.forEach(item => {
    const itemTotalPrice = item.price * item.quantity;
    totalCartPrice = totalCartPrice + itemTotalPrice;
  })

  function navigateAllProducts(){
    navigate("/category/all")
  }

  if(cartItems.length === 0){
    return (
      <>
      <Header cartItems={cartItems}/>
      <section className = {styles["cart-section"]}>
        <div className = {`${styles.container} ${styles["no-items-container"]}`}>
          <h1>There are currently no items in your cart.</h1>
          <button onClick = {navigateAllProducts}>Shop All Products <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </section>
      <Footer />
      </>
    )
  }


  return (
    <>
    <Header cartItems={cartItems}/>
    <section className = {styles["cart-section"]}>
      <div className = {styles.container}>
        <CartItemsHeader />
        {cartItems.map(cartItem => (
          <CartItem key = {cartItem._id} item = {cartItem} handleChangeQuantity={handleChangeQuantity} />
        ))}
        <CartItemsFooter totalPrice = {totalCartPrice} />
      </div>
    </section>
    <Footer />
    </>
  )
}

Cart.propTypes = {
  cartItems: PropTypes.array,
  handleRemoveItem: PropTypes.func,
  handleChangeQuantity: PropTypes.func,
}


export default Cart;