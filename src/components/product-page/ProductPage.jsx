import Header1 from "../shared/Header";
import Footer from "../shared/Footer";
import styles from './ProductPage.module.css';
import PropTypes from "prop-types"

function ProductPage({item}){
  return(
    <>
      <Header1 />
      <section className = {styles["product-information-page"]}>
{/*         TO-DO: add small hyperlink with route */}
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