import styles from './FeaturedPlushies.module.css';
import sharedStyles from './shared.module.css';
import ClickableItem from './ClickableItem';
import PropTypes from 'prop-types';

function FeaturedPlushies({plushies}){
  return (
    <section className = {styles["featured-plush-container"]}>
      <div className = {`${sharedStyles.container} ${styles["align-container"]}`}>
        <h1 className = {sharedStyles.header}>Featured Plushies</h1>
        <div className = {styles["plush-container"]}>
          {plushies.map(plush => (
            <ClickableItem plush = {plush} key = {plush.id}/>
          ))}
        </div>
        <button className = {styles["shop-plushies-btn"]}>Shop All Plushies</button>
      </div>
    </section>
  )
}

FeaturedPlushies.propTypes = {
  plushies: PropTypes.array,
}

export default FeaturedPlushies;