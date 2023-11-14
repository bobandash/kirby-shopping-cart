import Header1 from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./ProductPage.module.css";
import PropTypes from "prop-types";
import ErrorPage from "../Error/ErrorPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "../Loading/LoadingPage";
import QuantityOptions from "../../components/QuantityOptions";
import { preventMinus, preventPasteNegative } from "../../utils/input";
import { convertCurrencyFormat } from "../../utils/currency";

function ProductPage({ cartItems, addCartItem }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name } = useParams();
  /* for quantity form */
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState(false);
  const [isAddedToCart, setAddedToCart] = useState(false);
  const [isInputBoxActive, setInputBoxActive] = useState(false);

  function handleQuantityChange(e) {
    e.preventDefault();
    const inputBoxQuantity = e.target.value;
    if (inputBoxQuantity === "" || inputBoxQuantity === 0) {
      setQuantity(0);
    } else if (inputBoxQuantity === "30+") {
      setInputBoxActive(true);
      setQuantity(30);
    } else {
      setQuantity(Number(inputBoxQuantity));
    }
    setAddedToCart(false);
  }

  function blurDropdown(e) {
    e.target.size = 1;
    e.target.blur();
  }

  function removeAddedToCartText() {
    setAddedToCart(false);
  }

  function handleQuantityFormSubmit(e) {
    e.preventDefault();
    if (quantity === 0) {
      setQuantityError(true);
    } else {
      if (quantityError) {
        setQuantityError(false);
      }
      setAddedToCart(true);
      addCartItem(item, quantity);
    }
  }

  useEffect(() => {
    async function getProduct(id) {
      try {
        const response = await fetch("https://shopkirby.onrender.com/admin/api/products/id/" + id, {mode: "cors"});
        const data = await response.json();
        setItem(data);
        setError(false);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }
    getProduct(name);
  }, [name]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Header1 cartItems={cartItems} />
      <section className={styles["product-information-page"]}>
        <div className={styles.container}>
          <div className={styles["image-container"]}>
            <img src={item.imageUrl[0]} className={styles["product-image"]} />
          </div>
          <div className={styles["product-information-container"]}>
            <h1 className={styles["item-name"]}>{item.title}</h1>
            <h2 className={styles["item-price"]}>${convertCurrencyFormat(item.price)}</h2>
            <form htmlFor="cart-quantity" className={styles["qty-form"]}>
              <div className={styles["same-line"]}>
                <label htmlFor="quantity">Quantity:</label>
                {!isInputBoxActive ? (
                  <select
                    id="quantity"
                    className={styles["qty-select"]}
                    value={quantity}
                    onChange={(e) => {
                      handleQuantityChange(e);
                      blurDropdown(e);
                    }}
                    onFocus={(e) => {
                      removeAddedToCartText();
                      e.target.size = 5;
                    }}
                    onBlur={(e) => (e.target.size = 1)}
                  >
                    <QuantityOptions />
                  </select>
                ) : (
                  <input
                    id="quantity"
                    className={styles["qty-input"]}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    onKeyDown={preventMinus}
                    onPaste={preventPasteNegative}
                  />
                )}
              </div>
              <button className={styles["add-cart"]} onClick={handleQuantityFormSubmit}>
                Add To Cart
              </button>
              {quantityError && (
                <p className={`${styles["message"]} ${styles["failure"]}`}>
                  Invalid Quantity. Cannot Add to Cart.
                </p>
              )}
              {isAddedToCart && (
                <p className={`${styles["message"]} ${styles["success"]}`}>
                  Successfully added to cart.
                </p>
              )}
            </form>
            <h3 className={styles["description-header"]}>Description:</h3>
            <p className={styles["item-description"]}>{item.description}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

ProductPage.propTypes = {
  item: PropTypes.object,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
  cartItems: PropTypes.array,
  addCartItem: PropTypes.func
};

export default ProductPage;
