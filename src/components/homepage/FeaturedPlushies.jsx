import styles from './FeaturedPlushies.module.css';
import sharedStyles from './shared.module.css';
import ClickableItem from './ClickableItem';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import dividerStyle from '../shared/divider.module.css'
import { useRef, useEffect, useState } from 'react';

function FeaturedPlushies({plushies}){
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if(entry.isIntersecting){
        setIsHeaderVisible(true);
      }
    });
    observer.observe(headerRef.current);
  }, []);

  function redirectPlushies(){
      navigate("/category/plushies")
  }
  

  const headerClasses = isHeaderVisible ? `${sharedStyles.header} ${sharedStyles.visible}` : sharedStyles.header; 
  return (
    <section className = {`${dividerStyle["divider"]} ${styles["featured-plush-container"]}`}>
      <div className = {`${sharedStyles.container} ${styles["align-container"]}`}>
        <h1 ref = {headerRef} className = {headerClasses}>Featured Plushies</h1>
        <div className = {styles["plush-container"]}>
          {plushies.map(plush => (
            <ClickableItem plush = {plush} key = {plush.id}/>
          ))}
        </div>
        <button onClick = {redirectPlushies} className = {styles["shop-plushies-btn"]}>Shop All Plushies</button>
      </div>
    </section>
  )
}

FeaturedPlushies.propTypes = {
  plushies: PropTypes.array,
}

export default FeaturedPlushies;