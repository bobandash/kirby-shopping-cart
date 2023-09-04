import Header1 from "../shared/Header";
import Footer from "../shared/Footer";
import styles from './Category.module.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClickableItem from "../homepage/ClickableItem";
import ErrorPage from "../errorpage/ErrorPage";
import CATEGORIES from "../../constants/categories";
import LoadingScreen from "../loadingpage/LoadingPage";

function CategoryPage(){
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
        console.log(fetchUrl);
        const response = await fetch(fetchUrl);
        if(!response.ok){
          setError(true);
        } else {
          const data = await response.json();
          console.log(data);
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
      <Header1 />
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