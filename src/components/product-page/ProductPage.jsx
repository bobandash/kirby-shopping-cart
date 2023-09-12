import Header1 from "../shared/Header";
import Footer from "../shared/Footer";
import styles from './ProductPage.module.css';
import PropTypes from "prop-types"
import ErrorPage from "../errorpage/ErrorPage";
import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import LoadingScreen from "../loadingpage/LoadingPage";
import { v4 as uuid } from 'uuid';

function ProductPage({cartItems, addCartItem}){
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {name} = useParams();
  /* for quantity form */
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState(false);
  const [isAddedToCart, setAddedToCart] = useState(false);
  let quantityOptions = [];
  // creates an array with all quantity options
  for(let i = 1; i <= 30; i++){
    quantityOptions.push(
      {
        number: i,
        id: uuid
      }
    );
  }

  function handleQuantityChange(e){
    e.preventDefault();
    const inputBoxQuantity = e.target.value;
    if(inputBoxQuantity === "" || inputBoxQuantity === 0){
      setQuantity(0);
    } else {
      setQuantity(Number(inputBoxQuantity));
    }
    setAddedToCart(false);
  }

  function blurDropdown(e){
    e.target.size = 1;
    e.target.blur();
  }

  function removeAddedToCartText(){
    setAddedToCart(false);
  }

  function handleQuantityFormSubmit(e){
    e.preventDefault();
    if(quantity === 0){
      setQuantityError(true);
    } else {
      if(quantityError){
        setQuantityError(false);
      }
      setAddedToCart(true);
      addCartItem(item, quantity);
    }
  }

  useEffect(() => {
    async function getProduct(id){
      try {
        const response = await fetch('https://fakestoreapi.com/products/'+id);
        if(!response.ok){
          setError(true);
        } else {
          const data = await response.json();
          setItem(data);
          setError(false);
        }
        setLoading(false);
      }
      catch {
        setError(true);
      }
    }
    getProduct(name);
  }, [name])


  if(loading){
    return <LoadingScreen />
  }

  if(error){
    return <ErrorPage />
  }

  return(
    <>
      <Header1 cartItems = {cartItems}/>
      <section className = {styles["product-information-page"]}>
        <div className = {styles.container}>
          <div className = {styles["image-container"]}>
            <img src = {item.image} className = {styles["product-image"]} />
          </div>
          <div className = {styles["product-information-container"]}>
            <h1 className = {styles["item-name"]}>{item.title}</h1>
            <h2 className = {styles["item-price"]}>${item.price.toFixed(2)}</h2>
            <form className = {styles["qty-form"]}>
              <div className = {styles["same-line"]}>
                <label htmlFor = "quantity">Quantity:</label>
                <select className = {styles["qty-select"]}
                  onChange = {(e) => {
                    handleQuantityChange(e);
                    blurDropdown(e);
                  }}
                  onFocus = {(e) => {
                    removeAddedToCartText();
                    e.target.size=5;
                  }}
                  onBlur = {(e) => e.target.size=1}
                  >
                  {quantityOptions.map((obj) => (<option key = {obj.id}>{obj.number}</option>))}
                </select>
              </div>
              {quantityError && <p className = {`${styles["message"]} ${styles["failure"]}`}>Invalid Quantity. Cannot Add to Cart.</p>}
              <button
                className = {styles["add-cart"]}
                onClick = {(e) => {
                  handleQuantityFormSubmit(e);
                }}
              >
                Add To Cart
              </button>
              {isAddedToCart && <p className = {`${styles["message"]} ${styles["success"]}`}>Successfully added to cart.</p> }
            </form>
            <h3 className = {styles["description-header"]}>Description:</h3>
            <p className = {styles["item-description"]}>{item.description}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

ProductPage.propTypes ={
  item: PropTypes.object,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
  cartItems: PropTypes.array,
  addCartItem: PropTypes.func
}

export default ProductPage;