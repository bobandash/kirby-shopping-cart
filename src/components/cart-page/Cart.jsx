import Header1 from '../shared/Header';
import Footer from '../shared/Footer';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import CartItemsHeader from './CartItemHeader';
import CartItemsFooter from './CartItemsFooter'
import { useNavigate } from 'react-router-dom';

function Cart({cartItems, handleRemoveItem, handleChangeQuantity}){
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
      <Header1 cartItems={cartItems}/>
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
    <Header1 cartItems={cartItems}/>
    <section className = {styles["cart-section"]}>
      <div className = {styles.container}>
        <CartItemsHeader />
        {cartItems.map(cartItem => (
          <CartItem key = {cartItem.id} item = {cartItem} handleRemoveItem= {handleRemoveItem} handleChangeQuantity={handleChangeQuantity} />
        ))}
        <CartItemsFooter totalPrice = {totalCartPrice} />
      </div>
    </section>
    <Footer />
    </>
  )
}

export default Cart;