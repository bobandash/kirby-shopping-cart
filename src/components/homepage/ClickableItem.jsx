import styles from './ClickableItem.module.css'
// TO-DO: remove and add props to take any object once an API call is made
import kirbyFront from '../../assets/product-assets/little_buddy_kirby_front.jpg'

function ClickableItem(){
  return (
    <div className = {styles.card}>
      <img src = {kirbyFront} alt = "primary-image" />
      <h2 className = {styles["product-name"]}>Kirby</h2>
      <p className = {styles.price}>$19.99</p>
    </div>
  )
}

export default ClickableItem;