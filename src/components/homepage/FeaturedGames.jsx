import styles from './FeaturedGames.module.css';
import sharedStyles from './shared.module.css';
import kirbyForgottenLand from '../../assets/kriby-forgotten-land-promo.jpg'

function FeaturedGames(){
  return (
    <section className = {styles["featured-items-container"]}>
      <div className = {sharedStyles.container}>
        <h1 className = {sharedStyles.header}>Featured Games</h1>
        <div className = {styles["game-images-container"]}>
          <button className = {styles["caret-btn"]}><i className="fa-solid fa-angle-left"></i></button>
          <img src = {kirbyForgottenLand} className = {styles["game-image"]} />
          <button className = {styles["caret-btn"]}><i className="fa-solid fa-angle-right"></i></button>
        </div>
        
      </div>
    </section>
  )
}

export default FeaturedGames;