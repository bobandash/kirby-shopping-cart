import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import ErrorPage from "./components/errorpage/ErrorPage.jsx"
import ProductPage from "./components/product-page/ProductPage.jsx"
import CategoryPage from "./components/category-page/Category.jsx"
import { useState } from "react"

const Router = () => {
  const [cartItems, setCartItems] = useState([{quantity: 77}]);

  function addCartItem(item, itemQuantity){
    const hasItem = cartItems.filter(cartItem => cartItem.id === item.id).length > 0 ? true : false;

    if(hasItem){
      setCartItems(cartItems.map(cartItem => {
        if(cartItem.id === item.id){
          return cartItem.quantity += itemQuantity;
        }
        return cartItem;
      }))
    } else {
      setCartItems(...cartItems, {...item, quantity: itemQuantity})
    }
  }

  function removeCartItem(item){
    setCartItems(cartItems.filter(cartItem => {cartItem.id !== item.id}));
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App cartItems ={cartItems}/>,
      errorElement: <ErrorPage />
    },
    {
      path: "products/:name",
      element: <ProductPage cartItems ={cartItems} />
    },
    {
      path: "category/:name",
      element: <CategoryPage cartItems ={cartItems} />
    }
  ])

  return <RouterProvider router = {router} />;
}

export default Router;