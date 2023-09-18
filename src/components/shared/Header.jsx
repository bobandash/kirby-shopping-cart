import KirbyLogo from '../../assets/kirby-logo.png';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import SubHeader from './Subheader';
import cartIcon from '../../assets/Cart/empty_cart.png';
import kirbyCartIcon from '../../assets/Cart/kirby_in_cart.png';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import MobileSideBar from './Mobile-Sidebar';

function Header1({cartItems}){
  const addQuantities = (a,b) => Number(a) + Number(b);
  let cartItemQuantity;
  const cartItemQuantitiesArray = cartItems.map(cartItem => {return cartItem.quantity;});
  if(cartItemQuantitiesArray.length === 0){
    cartItemQuantity = 0;
  } else {
    cartItemQuantity = cartItemQuantitiesArray.reduce(addQuantities)
  }

  const [atTop, setAtTop] = useState(true);
  const [y, setY] = useState(window.scrollY);
  const [mobileSideBarIsActive, setMobileSideBarIsActive] = useState(false);

  window.addEventListener("scroll", () => {
    setY(window.scrollY);
  })

  useEffect(() => {
    if(y === 0){
      setAtTop(true);
    } else {
      setAtTop(false);
    }
  }, [y])

  // TO-DO: add search bar functionality
  function handleSearchClick(e) {
    e.preventDefault();
  }

  function handleMobileSideBar(){
    setMobileSideBarIsActive(!mobileSideBarIsActive);
  }

  const headerClasses = `${styles.header} ${atTop ? styles.opaque : ''}`;

  return (
    <>
    <header className = {headerClasses}>
      <div className = {styles["container-header"]}>
        {/* mobile hamburger bar */}
        <div 
          className = {styles["mobile-icon-container"]}
          onClick = {handleMobileSideBar}>
            <i className="fa-2x fa-solid fa-bars"></i>
        </div>        
        <div><Link to="/"><img className = {styles["kirby-logo"]} src = {KirbyLogo} alt = "Kirby Logo"/></Link></div>
        <form onSubmit = {(e) => {handleSearchClick(e)}} className = {`${styles["search-bar-form"]} ${styles["desktop-icon-container"]}`}>
          <input type = "text" placeholder = "Search Products..."/>
          <button type = "submit"><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
        <div className = {styles["profile-cart-container"]}>
          <Link to="/" className = {styles["desktop-icon-container"]}><i className="fa-2x fa-solid fa-user"></i><span>Sign In/Register</span></Link>
          {(cartItems.length === 0) ?
            <Link to="/cart"><img className = {styles["cart-icon"]} src = {cartIcon}/><span>Cart</span></Link> :
            <Link to="/cart">
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
    <MobileSideBar isActive = {mobileSideBarIsActive} />
    </>
  )
}

Header1.propTypes = {
  cartItems: PropTypes.array
}

export default Header1;