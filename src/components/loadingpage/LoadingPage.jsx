import Kirby from '../../assets/Loading/kirby-walking.gif';
import LoadingGif from '../../assets/Loading/loading.gif';
import styles from './LoadingPage.module.css'

function LoadingScreen(){
  return (
    <section className = {styles["loading-screen"]}>
      <img className = {styles["loading-gif"]} src = {LoadingGif} alt = "loading gif"/>
      <div className = {styles["kirby-img-container"]}>
        <img src = {Kirby} alt = "kirby gif" />
      </div>
    </section>
  )
}

export default LoadingScreen;