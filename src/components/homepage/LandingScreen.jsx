import KirbyLogo from '../../assets/kirby-name-logo.png';
import NoTrailStars from '../../assets/no trail.png';
import TrailStars from '../../assets/trail.png';
import styles from './LandingScreen.module.css';


function LandingScreen(){
  return(
    <section className = {styles["landing-screen"]}>
       <div className = {styles.container}>
          <img className = {styles.stars} src = {NoTrailStars} alt = "stars no trail" />
          <img className = {`${styles.stars} ${styles["trail-animation"]}`} src = {TrailStars} alt = "stars trail" />    
          <div className = {styles["store-information"]}>
            <img className = {styles["kirby-logo"]} src = {KirbyLogo} alt = "kirby-logo" />
            <h2 className = {styles.subheader}>The Fake Online Store</h2>
          </div>
       </div>
    </section>
  )
}

export default LandingScreen;