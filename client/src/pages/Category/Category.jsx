import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./Category.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClickableItem from "../Home/ClickableItem";
import ErrorPage from "../Error/ErrorPage";
import LoadingScreen from "../Loading/LoadingPage";
import PropTypes from "prop-types";

function CategoryPage({ cartItems }) {
  const [categoryItems, setCategoryItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // name corresponds to the category
  const { name } = useParams();

  useEffect(() => {
    function getFetchUrl(name) {
      if (name === "all")
        // TO-DO: change URL
        return "http://localhost:3000/admin/api/products/all";
      else {
        return (
          "http://localhost:3000/admin/api/products/" + name.charAt(0).toUpperCase() + name.slice(1)
        );
      }
    }

    async function getProducts() {
      try {
        const fetchUrl = getFetchUrl(name);
        const response = await fetch(fetchUrl, {mode: "cors"});
        if (!response.ok) {
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
  }, [name]);

  if (error) {
    return <ErrorPage />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header cartItems={cartItems} />
      <section className={styles["category-page"]}>
        <div className={styles["item-container"]}>
          {categoryItems.map((item) => (
            <ClickableItem item={item} key={item._id} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

CategoryPage.propTypes = {
  cartItems: PropTypes.array
};

export default CategoryPage;
