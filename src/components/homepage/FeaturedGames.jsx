import styles from './FeaturedGames.module.css';
import dividerStyle from '../shared/divider.module.css'
import sharedStyles from './shared.module.css';
import { useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function FeaturedGames({games}){
  const [activeGameNumber, setActiveGameNumber] = useState(0);
  const headerRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const numGamesArrayIndex = games.length - 1;
  const navigate = useNavigate();
  useEffect(() => {
    function incrementActiveGameNumber(){
      if(activeGameNumber === numGamesArrayIndex){
        setActiveGameNumber(0);
      } else {
        setActiveGameNumber(activeGameNumber + 1);
      }
    }
    const key = setInterval(incrementActiveGameNumber, 10000)
    return () => {
      clearInterval(key)
    }
  }, [activeGameNumber, numGamesArrayIndex])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if(entry.isIntersecting){
        setIsHeaderVisible(true);
      }
    });
    observer.observe(headerRef.current);
  }, []);


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

  function handleCircleClick(index){
    if(activeGameNumber !== index){
      setActiveGameNumber(index);
    }
  }

  function redirectToItem(id){
    navigate("/products/"+id);
  }

  function createCircleGameNav(index, key){
    if(activeGameNumber === index) {
      return (<button key = {key} className = {`${styles.active} ${styles["circle-nav"]}`}></button>)
    }
    return (<button key = {key} onClick = {() => {handleCircleClick(index)}}className = {styles["circle-nav"]}></button>)
  }

  const headerClasses = isHeaderVisible ? `${sharedStyles.header} ${sharedStyles.visible}` : sharedStyles.header; 
  return (
    <section className = {`${styles["featured-items-container"]} ${dividerStyle["divider"]}`}>
      <div className = {sharedStyles.container}>
        <h1 ref = {headerRef} className = {headerClasses}>Featured Games</h1>
        <div className = {styles["game-images-container"]}>
          <button onClick = {decrementActiveGameNumber} className = {styles["caret-btn"]}><i className="fa-solid fa-angle-left"></i></button>
          <div onClick = {() => redirectToItem(games[activeGameNumber].id)} className = {styles["clickable-images-container"]}>
            <img src = {games[activeGameNumber].image} className = {styles["game-image"]} />
          </div>
          <button onClick = {incrementActiveGameNumber} className = {styles["caret-btn"]}><i className="fa-solid fa-angle-right"></i></button>
        </div>
        {games.length >= 2 && 
          <div className = {styles["circle-nav-container"]}>
            {games.map((game,index) => createCircleGameNav(index, game.id))}
          </div>
        }
      </div>
    </section>
  )
}



FeaturedGames.propTypes = {
  games: PropTypes.array,
  image: PropTypes.string,
}
export default FeaturedGames;