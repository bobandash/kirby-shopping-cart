import styles from "./Cart.module.css"

function CartItemsHeader(){
  return (
    <section className = {styles["cart-item-header"]}>
      <h1>Product</h1>
      <h1>Quantity</h1>
      <h1>Price</h1>
      <h1>Total Price</h1>
    </section>
  )
}

export default CartItemsHeader;