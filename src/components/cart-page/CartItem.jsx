import styles from './Cart.module.css';

function CartItem({item, handleRemoveItem, handleChangeQuantity}){
  const totalPrice = item.quantity * item.price;

  return(
    <div className = {styles["cart-item"]}>
      <div className = {styles["product-image-name-container"]}>
        <img className = {styles["product-image"]} src = {item.image} alt = {item.title} />
        <p className = {styles["product-name"]}>{item.title}</p>
      </div>
      <div className = {styles["quantity-container"]}>
        <input type = "number" value = {item.quantity} onChange = {(e) => {
            handleChangeQuantity(item, e.target.value)
        }}/>
        <button className = {styles["remove-product"]} onClick = {() => {handleRemoveItem(item)}}><i className="fa-solid fa-trash"></i> Remove Product</button>
      </div>
      <p className = {styles["product-price"]}>${item.price.toFixed(2)}</p>
      <p className = {styles["product-total-price"]}>${totalPrice.toFixed(2)}</p>
    </div>
  )
}

export default CartItem;