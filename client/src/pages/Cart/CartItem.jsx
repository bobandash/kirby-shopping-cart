import styles from "./Cart.module.css";
import QuantityOptionsIncludingZero from "../../components/QuantityOptionsIncludingZero";
import { useState } from "react";
import { preventMinus, preventPasteNegative } from "../../utils/input";
import PropTypes from "prop-types";
import { convertCurrencyFormat } from "../../utils/currency";

function CartItem({ item, handleChangeQuantity }) {
  const totalPrice = item.quantity * item.price;
  const [isInputBox, setIsInputBox] = useState(() => (item.quantity >= 30 ? true : false));
  const [editQty, setEditQty] = useState(item.quantity);
  const [isUpdatingQty, setIsUpdatingQty] = useState(false);
  const [isSelectFocused, setIsSelectFocused] = useState(false);

  function blurDropdown(e) {
    e.target.size = 1;
    e.target.blur();
  }

  function handleFocusOff() {
    setIsSelectFocused(false);
  }

  function handleFocusOn() {
    setIsSelectFocused(true);
  }

  const selectClasses = isSelectFocused
    ? `${styles["focused"]} ${styles["quantity-select"]}`
    : `${styles["quantity-select"]}`;

  return (
    <div className={styles["cart-item"]}>
      <div className={styles["product-image-name-container"]}>
        <img className={styles["product-image"]} src={item.imageUrl[0]} alt={item.title} />
        <p className={styles["product-name"]}>{item.title}</p>
      </div>
      <div className={styles["quantity-container"]}>
        {!isInputBox ? (
          <>
            <select
              className={selectClasses}
              data-testid="select-quantity"
              onChange={(e) => {
                if (e.target.value === "0 (Delete)") {
                  handleChangeQuantity(item, 0);
                } else if (e.target.value === "30+") {
                  handleChangeQuantity(item, 30);
                  setEditQty(30);
                  setIsInputBox(false);
                } else {
                  handleChangeQuantity(item, e.target.value);
                }
                blurDropdown(e);
                if (e.target.value === "30+") {
                  setIsInputBox(30);
                }
              }}
              onFocus={(e) => {
                e.target.size = 5;
                handleFocusOn();
              }}
              onBlur={(e) => {
                e.target.size = 1;
                handleFocusOff();
              }}
              value={item.quantity}
            >
              <QuantityOptionsIncludingZero />
            </select>
          </>
        ) : (
          <>
            <input
              type="number"
              data-testid="input-quantity"
              value={editQty}
              min="1"
              onKeyDown={preventMinus}
              onPaste={preventPasteNegative}
              onChange={(e) => {
                setEditQty(Number(e.target.value));
                setIsUpdatingQty(true);
              }}
            />
            {isUpdatingQty && (
              <>
                <button
                  onClick={() => {
                    const numberQty = Number(editQty);
                    handleChangeQuantity(item, numberQty);
                    setIsUpdatingQty(false);
                    if (editQty < 30) {
                      setIsInputBox(false);
                    }
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setIsUpdatingQty(false);
                    setEditQty(Number(item.quantity));
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </>
        )}
      </div>
      <p className={styles["product-price"]}>${convertCurrencyFormat(item.price)}</p>
      <p className={styles["product-total-price"]}>${convertCurrencyFormat(totalPrice)}</p>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.object,
  handleChangeQuantity: PropTypes.func
};

export default CartItem;
