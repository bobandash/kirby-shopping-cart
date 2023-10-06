import styles from './FeaturedPlushies.module.css';
import sharedStyles from './shared.module.css';
import ClickableItem from './ClickableItem';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import dividerStyle from '../../components/divider.module.css'
import { useRef, useEffect, useState } from 'react';

function FeaturedPlushies({plushies}){
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const plushBtnRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isPlushBtnVisible, setIsPlushBtnVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const headerEntry = entries[0];
      if(headerEntry.isIntersecting){
        setIsHeaderVisible(true);
      }

    });
    observer.observe(headerRef.current);

  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const plushBtnEntry = entries[0];
      if (plushBtnEntry.isIntersecting){
        setIsPlushBtnVisible(true);
      }    
    });
    observer.observe(plushBtnRef.current);
  }, []);


  function redirectPlushies(){
      navigate("/category/plushies")
  }
  

  const headerClasses = isHeaderVisible ? `${sharedStyles.header} ${sharedStyles.visible}` : sharedStyles.header;
  const plushBtnClasses = isPlushBtnVisible ? `${styles.visible} ${styles["shop-plushies-btn"]}` : styles["shop-plushies-btn"];
  return (
    <section className = {`${dividerStyle["divider"]} ${styles["featured-plush-container"]}`}>
      <div className = {`${sharedStyles.container} ${styles["align-container"]}`}>
        <h1 ref = {headerRef} className = {headerClasses}>Featured Plushies</h1>
        <div className = {styles["plush-container"]}>
          {plushies.map(plush => (
            <ClickableItem item = {plush} key = {plush.id}/>
          ))}
        </div>
        <button 
          ref = {plushBtnRef}
          onClick = {redirectPlushies}
          className = {plushBtnClasses}>
            Shop All Plushies
        </button>
      </div>
    </section>
  )
}

FeaturedPlushies.propTypes = {
  plushies: PropTypes.array,
}

export default FeaturedPlushies;