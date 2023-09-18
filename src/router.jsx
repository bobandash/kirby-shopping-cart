import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import ErrorPage from "./components/errorpage/ErrorPage.jsx"
import ProductPage from "./components/product-page/ProductPage.jsx"
import CategoryPage from "./components/category-page/Category.jsx"
import { useState } from "react"
import Cart from "./components/cart-page/Cart.jsx"

const Router = () => {
  const [cartItems, setCartItems] = useState([]);

  function addCartItem(item, itemQuantity){
    const hasItem = cartItems.filter(cartItem => cartItem.id === item.id).length > 0 ? true : false;

    if(hasItem){
      setCartItems(cartItems.map(cartItem => {
        if(cartItem.id === item.id){
          return {...cartItem, quantity: cartItem.quantity + itemQuantity};
        }
        return cartItem;
      }))
    } else {
      setCartItems([...cartItems, {...item, quantity: itemQuantity}])
    }
  }

  function removeCartItem(item){
    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
  }

  function changeCartQuantity(item, newQuantity){
    if(Number(newQuantity) === 0 || newQuantity === '' || newQuantity === '0 (Delete)'){
      removeCartItem(item);
    } else {
      setCartItems(cartItems.map(cartItem => {
        if(cartItem.id === item.id){
          return {...cartItem, quantity: newQuantity};
        }
        return cartItem;
      }))
    }
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App cartItems ={cartItems}/>,
      errorElement: <ErrorPage />
    },
    {
      path: "products/:name",
      element: <ProductPage cartItems ={cartItems} addCartItem = {addCartItem} />
    },
    {
      path: "category/:name",
      element: <CategoryPage cartItems ={cartItems} />
    },
    {
      path: "cart",
      element: <Cart cartItems = {cartItems} handleRemoveItem = {removeCartItem} handleChangeQuantity = {changeCartQuantity} />
    }
  ])

  return <RouterProvider router = {router} />;
}

export default Router;