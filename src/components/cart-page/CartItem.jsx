import styles from './Cart.module.css';
import QuantityOptionsIncludingZero from './QuantityOptionsIncludingZero';
import { useState } from 'react';
import { preventMinus, preventPasteNegative } from '../../shared-functions/input';

function CartItem({item, handleRemoveItem, handleChangeQuantity}){
  const totalPrice = item.quantity * item.price;
  const [isInputBox, setIsInputBox] = useState(() => item.quantity >= 30 ? true : false)
  const [editQty, setEditQty] = useState(item.quantity);
  const [isUpdatingQty, setIsUpdatingQty] = useState(false);

  function blurDropdown(e){
    e.target.size = 1;
    e.target.blur();
  }

  return(
    <div className = {styles["cart-item"]}>
      <div className = {styles["product-image-name-container"]}>
        <img className = {styles["product-image"]} src = {item.image} alt = {item.title} />
        <p className = {styles["product-name"]}>{item.title}</p>
      </div>
      <div className = {styles["quantity-container"]}>
      {!isInputBox ? 
        <>
          <select className = {styles["quantity-select"]}
            onChange = {(e) => {
              if(e.target.value === '30+'){
                handleChangeQuantity(item, 30);
                setEditQty(30);
                setIsInputBox(false)
              } else {
                handleChangeQuantity(item, e.target.value);
              }
              blurDropdown(e);
              if(e.target.value === '30+'){
                setIsInputBox(30);
              }
            }}
            onFocus = {(e) => {
              e.target.size=5;
            }}
            onBlur = {(e) => e.target.size=1}
            value = {item.quantity}
          >
            <QuantityOptionsIncludingZero /> 
          </select>
        </>
        :
        <>
          <input type = "number"
            value = {editQty}
            min = "1"
            onKeyDown={preventMinus}
            onPaste={preventPasteNegative}
            onChange = {(e) => {
              setEditQty(e.target.value);
              setIsUpdatingQty(true);
          }}/>
          {isUpdatingQty &&
            <>
            <button
              onClick = {() => {
                handleChangeQuantity(item, editQty);
                setIsUpdatingQty(false)
                if(editQty < 30){
                  setIsInputBox(false);
                }
              }}>
              Update
            </button>
            <button
              onClick = {() => {
                setIsUpdatingQty(false)
                setEditQty(item.quantity);
              }}
            >
              Cancel
            </button>
            </>
          }
        </>
        
      }
      </div>
      <p className = {styles["product-price"]}>${item.price.toFixed(2)}</p>
      <p className = {styles["product-total-price"]}>${totalPrice.toFixed(2)}</p>
    </div>
    
  )
}

export default CartItem;