import KirbyLogo from "../../assets/kirby-name-logo.png";
import NoTrailStars from "../../assets/no trail.png";
import TrailStars from "../../assets/trail.png";
import styles from "./LandingScreen.module.css";
import KirbySitting from "../../assets/kirby-sitting.png";
import waddleDee from "../../assets/Landing Page/waddle dee.png";
import metaKnight from "../../assets/Landing Page/meta knight.png";
import kingDeDeDe from "../../assets/Landing Page/king de de de.png";

function LandingScreen() {
  return (
    <section className={styles["landing-screen"]}>
      <div className={styles.container}>
        <div className={styles["stars-container"]}>
          <img
            className={styles.stars}
            src={NoTrailStars}
            alt="stars no trail"
          />
          <img
            className={`${styles.stars} ${styles["trail-animation"]}`}
            src={TrailStars}
            alt="stars trail"
          />
        </div>
        <div className={styles["store-information"]}>
          <img
            className={styles["kirby-logo"]}
            src={KirbyLogo}
            alt="kirby-logo"
          />
          <h2 className={styles.subheader}>The Fake Online Store</h2>
        </div>
        <img
          className={styles["kirby-sitting"]}
          src={KirbySitting}
          alt="kirby-sitting"
        />
        <img
          className={`${styles["desktop-image"]} ${styles["top-middle"]}`}
          src={kingDeDeDe}
          alt="king de de de"
        />
        <img
          className={`${styles["desktop-image"]} ${styles["top-left"]}`}
          src={waddleDee}
          alt="waddle dee"
        />
        <img
          className={`${styles["desktop-image"]} ${styles["top-right"]}`}
          src={metaKnight}
          alt="meta knight"
        />
      </div>
    </section>
  );
}

export default LandingScreen;
