import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from './Category.module.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClickableItem from "../Home/ClickableItem";
import ErrorPage from "../Error/ErrorPage";
import CATEGORIES from "../../constants/categories";
import LoadingScreen from "../Loading/LoadingPage";

function CategoryPage({cartItems}){
  const [categoryItems, setCategoryItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // name corresponds to the category
  const {name} = useParams();

  useEffect(() => {
    function getFetchUrl(name){
      if(name === "all")
        return "https://fakestoreapi.com/products/"
      
      let apiCategory;
      switch(name){
        case "games":
          apiCategory = CATEGORIES.Games;
          break;
        case "plushies":
          apiCategory = CATEGORIES.Plushies;
          break;
        case "keychains":
          apiCategory = CATEGORIES.Keychains;
          break;
      }
      return "https://fakestoreapi.com/products/category/"+apiCategory;
    }

    async function getProducts(){
      try{
        const fetchUrl = getFetchUrl(name);
        const response = await fetch(fetchUrl);
        if(!response.ok){
          setError(true);
        } else {
          const data = await response.json();
          setCategoryItems(data);
          setLoading(false);
        }
      } catch {
        setError(false);
      }
    }
    getProducts();
  }, [name])

  if(error) {
    return(<ErrorPage />)
  }

  if(loading) {
    return(<LoadingScreen />)
  }

  return (
    <>
      <Header cartItems = {cartItems}/>
        <section className = {styles["category-page"]}>
          <div className = {styles["item-container"]}>
            {categoryItems.map((item) => (
              <ClickableItem plush = {item} key = {item.id} />
            ))}
          </div>
        </section>
      <Footer />
    </>
  )
}

export default CategoryPage;