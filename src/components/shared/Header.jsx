import KirbyLogo from '../../assets/kirby-logo.png';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import SubHeader from './Subheader';
import cartIcon from '../../assets/Cart/empty_cart.png';
import kirbyCartIcon from '../../assets/Cart/kirby_in_cart.png';

function Header1({cartItems}){
  const addQuantities = (a,b) => a + b;
  let cartItemQuantity;
  const cartItemQuantitiesArray = cartItems.map(cartItem => {return cartItem.quantity;});
  if(cartItemQuantitiesArray.length === 0){
    cartItemQuantity = 0;
  } else {
    cartItemQuantity = cartItemQuantitiesArray.reduce(addQuantities)
  }

  return (
    <header className = {styles.header}>
      <div className = {styles["container-header"]}>
        <div><Link to="/"><img className = {styles["kirby-logo"]} src = {KirbyLogo} alt = "Kirby Logo"/></Link></div>
        <form className = {styles["search-bar-form"]}>
          <input type = "text" placeholder = "Search Products..."/>
          <button type = "submit"><i className="fa-lg fa-solid fa-magnifying-glass"></i></button>
        </form>
        <div className = {styles["profile-cart-container"]}>
          <Link to="/"><i className="fa-lg fa-solid fa-user "></i><span>Sign In/Register</span></Link>
          {(cartItems.length === 0) ?
            <Link to="/"><img className = {styles["cart-icon"]} src = {cartIcon} /><span>Cart</span></Link> :
            <Link to="/">
              <div className = {styles["cart-icon-container"]}>
                <img className = {styles["cart-icon"]} src = {kirbyCartIcon} />
                {cartItemQuantity > 99 ? 
                  <p className = {`${styles["cart-quantity"]} ${styles["three-digits"]}`}>99+</p> :
                  <p className = {`${styles["cart-quantity"]} ${styles["less-than-two-digits"]}`}>{cartItemQuantity}</p>
                }
              </div>
              <span>Cart</span>
            </Link>
          }
        </div>
      </div>
      <SubHeader />
    </header>
  )
}

export default Header1;