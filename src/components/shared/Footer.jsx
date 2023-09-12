import styles from './Footer.module.css'
import SleepingKirby from '../../assets/KSSU_Sleep_Kirby.png'
import { useState } from 'react';
import FooterItems from './FooterItems';
import { v4 as uuid } from 'uuid';
import dividerStyle from './divider.module.css';

function Footer(){
  const dropdownNumber = {
    none: 0,
    categories: 1,
    customerService: 2,
    siteInfo: 3
  }
  const [activeDropdownNumber, setActiveDropdownNumber] = useState(dropdownNumber.none);

  const footerItem = (name, url, id) => {
    return {name, url, id}
  }

  function handleSetActiveDropdownNumber(number){
    if(activeDropdownNumber === number){
      setActiveDropdownNumber(dropdownNumber.none);
    } else {
      setActiveDropdownNumber(number);
    }
  }

  const categoriesNavObject = [
    footerItem("Shop All", "/category/all", uuid()),
    footerItem("Games", "/category/games", uuid()),
    footerItem("Plushies", "/category/plushies", uuid()),
    footerItem("Keychains", "/category/keychains", uuid())
  ]

  const customerServiceNavObject = [
    footerItem("Company Bio", "/", uuid()),
    footerItem("Privacy Policy", "/", uuid()),
    footerItem("Terms of Service", "/", uuid()),
    footerItem("Refund Policy", "/", uuid()),
  ]

  const siteInfoNavObject = [
    footerItem("About Kirby", "/", uuid()),
    footerItem("News", "/", uuid()),
  ]

  return (
    <footer className = {`${styles.footer} ${dividerStyle.divider}`}>
      <img className = {styles["sleeping-kirby"]} src = {SleepingKirby} alt = "sleeping kirby" />
      <div className = {styles["footer-container"]}>
        <FooterItems 
          dropdownNumber = {dropdownNumber.categories}
          activeDropdownNumber= {activeDropdownNumber}
          footerName = "Categories"
          footerNavItemsArray= {categoriesNavObject}
          handleClick= {handleSetActiveDropdownNumber}
        />
        <FooterItems 
          dropdownNumber = {dropdownNumber.customerService}
          activeDropdownNumber= {activeDropdownNumber}
          footerName = "Customer Service"
          footerNavItemsArray= {customerServiceNavObject}
          handleClick= {handleSetActiveDropdownNumber}
        />
        <FooterItems 
          dropdownNumber = {dropdownNumber.siteInfo}
          activeDropdownNumber= {activeDropdownNumber}
          footerName = "Site Info"
          footerNavItemsArray= {siteInfoNavObject}
          handleClick= {handleSetActiveDropdownNumber}
        />
      </div>
    </footer>
  )
}

export default Footer;