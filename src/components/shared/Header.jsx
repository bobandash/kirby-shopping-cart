import KirbyLogo from '../../assets/kirby-logo.png';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import SubHeader from './Subheader';

function Header1(){
  return (
    <header className = {styles.header}>
      <div className = {styles["container-header"]}>
        <div><Link to="/"><img className = {styles["kirby-logo"]} src = {KirbyLogo} alt = "Kirby Logo"/></Link></div>
        <form className = {styles["search-bar-form"]}>
          <input type = "text" placeholder = "Search Products..."/>
          <button type = "submit"><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
        <div className = {styles["profile-cart-container"]}>
          <Link to="/"><i className="fa-solid fa-user"></i><span>Sign In/Register</span></Link>
          <Link to="/"><i className="fa-solid fa-cart-shopping"></i><span>Cart</span></Link>
        </div>
      </div>
      <SubHeader />
    </header>
  )
}

export default Header1;