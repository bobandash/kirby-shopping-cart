import styles from "./ClickableItem.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import plushAnimationStyles from "./FeaturedPlushies.module.css";
import { useRef, useState, useEffect } from "react";
import { convertCurrencyFormat } from "../../utils/currency";

function ClickableItem({ item }) {
  const navigate = useNavigate();
  const clickableItemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  function redirectItem(plushId) {
    navigate("/products/" + plushId);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
    observer.observe(clickableItemRef.current);
  }, []);

  const clickableItemClasses = isVisible
    ? `${styles.card} ${plushAnimationStyles.visible}`
    : styles.card;
  return (
    <div
      ref={clickableItemRef}
      onClick={() => {
        redirectItem(item._id);
      }}
      data-testid="product-card"
      className={clickableItemClasses}
    >
      <div className={styles["image-container"]}>
        <img src={item.imageUrl[0]} alt="primary-image" />
      </div>
      <h2 className={styles["product-name"]}>{item.title}</h2>
      <p className={styles.price}>${convertCurrencyFormat(item.price)}</p>
    </div>
  );
}

ClickableItem.propTypes = {
  item: PropTypes.object,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  imageUrl: PropTypes.array
};

export default ClickableItem;
