import Header1 from "../shared/Header";
import Footer from "../shared/Footer";
import styles from './ProductPage.module.css';
import PropTypes from "prop-types"
import ErrorPage from "../errorpage/ErrorPage";
import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import LoadingScreen from "../loadingpage/LoadingPage";

function ProductPage(){
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {name} = useParams();

  useEffect(() => {
    //TO-DO: 
    async function getProduct(id){
      try {
        const response = await fetch('https://fakestoreapi.com/products/'+id);
        if(!response.ok){
          setError(true);
        } else {
          const data = await response.json();
          setItem(data);
          setError(false);
        }
        setLoading(false);
      }
      catch {
        setError(true);
      }
    }
    getProduct(name);
  }, [name])


  if(loading){
    //TO-DO: change to loading page
    return <LoadingScreen />
  }

  if(error){
    return <ErrorPage />
  }

  return(
    <>
      <Header1 />
      <section className = {styles["product-information-page"]}>
        <div className = {styles.container}>
          <div className = {styles["image-container"]}>
            <img src = {item.image} className = {styles["product-image"]} />
          </div>
          <div className = {styles["product-information-container"]}>
            <h1 className = {styles["item-name"]}>{item.title}</h1>
            <h2 className = {styles["item-price"]}>{item.price}</h2>
            <button className = {styles["add-cart"]}>Add To Cart</button>
            <h3 className = {styles["description-header"]}>Description:</h3>
            <p className = {styles["item-description"]}>{item.description}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

ProductPage.propTypes ={
  item: PropTypes.object,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string
}

export default ProductPage;