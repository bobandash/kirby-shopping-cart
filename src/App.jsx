import Header from './components/shared/Header'
import LandingScreen from './components/homepage/LandingScreen'
import FeaturedGames from './components/homepage/FeaturedGames'
import FeaturedPlushies from './components/homepage/FeaturedPlushies'
import Footer from './components/shared/Footer'
import { useState, useEffect } from 'react'
import CATEGORIES from './constants/categories'

/* renders featured plush and featured games for the home screen */
function GetFeaturedProducts(){
  const [featuredPlushies, setFeaturedPlushies] = useState(null);
  const [featuredGames, setFeaturedGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getFeaturedPlushies(){
    const response = await fetch(`https://fakestoreapi.com/products/category/${CATEGORIES.Plushies}?limit=3`);
    const data = response.json();
    return data;
  }

  async function getFeaturedGames(){
    const response = await fetch(`https://fakestoreapi.com/products/category/${CATEGORIES.Games}?limit=3`);
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

function App() {
  const {featuredPlushies, featuredGames, loading, error} = GetFeaturedProducts();
  
  if(loading){
    return(<div>Loading...</div>);
  }

  if(error){
    return(<div>404 Error</div>);
  }

  return (
    <>
      <Header />
      <LandingScreen />
      <FeaturedGames games = {featuredGames}/>
      <FeaturedPlushies plushies = {featuredPlushies}/>
      <Footer />
    </>
  )
}

export default App;
