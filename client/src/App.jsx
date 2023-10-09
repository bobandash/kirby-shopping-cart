import Header from './components/Header'
import LandingScreen from './pages/Home/LandingScreen'
import FeaturedGames from './pages/Home/FeaturedGames'
import FeaturedPlushies from './pages/Home/FeaturedPlushies'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import LoadingScreen from './pages/Loading/LoadingPage'
import PropTypes from 'prop-types'

/* renders featured plush and featured games for the home screen */
function GetFeaturedProducts(){
  const [featuredPlushies, setFeaturedPlushies] = useState(null);
  const [featuredGames, setFeaturedGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getFeaturedPlushies(){
    const response = await fetch(`http://localhost:3000/admin/api/featured/plush`, {mode: 'cors'});
    const data = response.json();
    return data;
  }

  async function getFeaturedGames(){
    const response = await fetch(`http://localhost:3000/admin/api/featured/game`, {mode: 'cors'});
    const data = response.json();
    return data;    
  }

  useEffect(() => {
    // TO-DO: change fetch to kirby
    const dataFetch = async () => {
      try {
        const [featuredPlushFetch, featuredGamesFetch] = await Promise.all([
          getFeaturedPlushies(),
          getFeaturedGames()
        ])
        setFeaturedPlushies(featuredPlushFetch);
        setFeaturedGames(featuredGamesFetch);
        setLoading(false);
      } catch {
        setError(false);
        setLoading(false);
      }
    }
    dataFetch();
  }, [])


  return {featuredPlushies, featuredGames, loading, error};
}

function App({cartItems}) {
  const {featuredPlushies, featuredGames, loading, error} = GetFeaturedProducts();
  
  if(loading){
    return(<LoadingScreen />);
  }

  if(error){
    return(<div>404 Error</div>);
  }

  return (
    <>
      <Header cartItems = {cartItems}/>
      <LandingScreen />
      <FeaturedGames games = {featuredGames}/>
      <FeaturedPlushies plushies = {featuredPlushies}/>
      <Footer />
    </>
  )
}

App.propTypes = {
  cartItems: PropTypes.array,
}

export default App;
