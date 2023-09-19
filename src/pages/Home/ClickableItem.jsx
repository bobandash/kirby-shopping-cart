import styles from './ClickableItem.module.css'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import plushAnimationStyles from './FeaturedPlushies.module.css';
import { useRef, useState, useEffect } from 'react';
function convertDouble(number){
  return number.toFixed(2);
}

function ClickableItem({plush}){
  const navigate = useNavigate();
  const clickableItemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  function redirectPlush(plushId){
    navigate("/products/" + plushId)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if(entry.isIntersecting){
        setIsVisible(true);
      }
    });
    observer.observe(clickableItemRef.current);
  }, []);

  const clickableItemClasses = isVisible ? `${styles.card} ${plushAnimationStyles.visible}` : styles.card; 
  return (
    <div 
      ref = {clickableItemRef}
      onClick = {() => {
      redirectPlush(plush.id);
    }} className = {clickableItemClasses}>
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