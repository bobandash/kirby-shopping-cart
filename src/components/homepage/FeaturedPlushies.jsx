import styles from './FeaturedPlushies.module.css';
import sharedStyles from './shared.module.css';
import ClickableItem from './ClickableItem';

function FeaturedPlushies(){
  return (
    <section className = {styles["featured-plush-container"]}>
      <div className = {`${sharedStyles.container} ${styles["align-container"]}`}>
        <h1 className = {sharedStyles.header}>Featured Plushies</h1>
        <div className = {styles["plush-container"]}>
          <ClickableItem />
          <ClickableItem />
          <ClickableItem />
        </div>
        <button className = {styles["shop-plushies-btn"]}>Shop All Plushies</button>
      </div>
    </section>
  )
}

export default FeaturedPlushies;