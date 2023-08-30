import styles from './Footer.module.css'
import SleepingKirby from '../../assets/KSSU_Sleep_Kirby.png'

function Footer(){
  return (
    <footer className = {styles.footer}>
      <img className = {styles["sleeping-kirby"]} src = {SleepingKirby} alt = "sleeping kirby" />
      <div className = {styles["footer-container"]}>
        <div className = {styles["col"]}>
          <h3>Categories</h3>
          <ul>
            <li>Games</li>
            <li>Plush</li>
            <li>Keychain</li>
          </ul>
        </div>
        <div className = {styles["col"]}>
          <h3>Customer Service</h3>
          <ul>
            <li>Company Bio</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Refund Policy</li>
          </ul>
        </div>
        <div className = {styles["col"]}>
          <h3>Site Info</h3>
          <ul>
            <li>About Kirby</li>
            <li>News</li>
          </ul>
          <div className = "social-media-links">
            <a href="" target="_blank"></a>
            <a href="" target="_blank"></a>
            <a href="" target="_blank"></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;