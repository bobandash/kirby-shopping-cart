import styles from './ClickableItem.module.css'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function convertDouble(number){
  return number.toFixed(2);
}



function ClickableItem({plush}){
  const navigate = useNavigate();
  
  function redirectPlush(plushId){
    navigate("/products/" + plushId)
  }
  return (
    <div onClick = {() => {
      redirectPlush(plush.id);
    }} className = {styles.card}>
      <div className = {styles["image-container"]}>
        <img src = {plush.image} alt = "primary-image" />
      </div>
      <h2 className = {styles["product-name"]}>{plush.title}</h2>
      <p className = {styles.price}>${convertDouble(plush.price)}</p>
    </div>
  )
}

ClickableItem.propTypes = {
  plush: PropTypes.object,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string
}


export default ClickableItem;