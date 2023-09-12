import styles from './FeaturedPlushies.module.css';
import sharedStyles from './shared.module.css';
import ClickableItem from './ClickableItem';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import dividerStyle from '../shared/divider.module.css'

function FeaturedPlushies({plushies}){
    const navigate = useNavigate();
  
  function redirectPlushies(){
      navigate("/category/plushies")
  }
  
  return (
    <section className = {`${dividerStyle["divider"]} ${styles["featured-plush-container"]}`}>
      <div className = {`${sharedStyles.container} ${styles["align-container"]}`}>
        <h1 className = {sharedStyles.header}>Featured Plushies</h1>
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