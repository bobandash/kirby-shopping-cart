import styles from './FeaturedGames.module.css';
import sharedStyles from './shared.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

function FeaturedGames({games}){
  const [activeGameNumber, setActiveGameNumber] = useState(0);
  const numGamesArrayIndex = games.length - 1;

  function incrementActiveGameNumber(){
    if(activeGameNumber === numGamesArrayIndex){
      setActiveGameNumber(0);
    } else {
      setActiveGameNumber(activeGameNumber + 1);
    }
  }

  function decrementActiveGameNumber(){
    if(activeGameNumber === 0){
      setActiveGameNumber(numGamesArrayIndex);
    } else {
      setActiveGameNumber(activeGameNumber - 1);
    }
  }

  return (
    <section className = {styles["featured-items-container"]}>
      <div className = {sharedStyles.container}>
        <h1 className = {sharedStyles.header}>Featured Games</h1>
        <div className = {styles["game-images-container"]}>
          <button onClick = {decrementActiveGameNumber} className = {styles["caret-btn"]}><i className="fa-solid fa-angle-left"></i></button>
          <div className = {styles["clickable-images-container"]}>
            <img src = {games[activeGameNumber].image} className = {styles["game-image"]} key = {games[activeGameNumber].id} />
          </div>
          <button onClick = {incrementActiveGameNumber} className = {styles["caret-btn"]}><i className="fa-solid fa-angle-right"></i></button>
        </div>
        
      </div>
    </section>
  )
}



FeaturedGames.propTypes = {
  games: PropTypes.object,
  image: PropTypes.string,
}
export default FeaturedGames;