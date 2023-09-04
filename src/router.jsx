import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import ErrorPage from "./components/errorpage/ErrorPage.jsx"
import ProductPage from "./components/product-page/ProductPage.jsx"
import CategoryPage from "./components/category-page/Category.jsx"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />
    },
    {
      path: "products/:name",
      element: <ProductPage />
    },
    {
      path: "category/:name",
      element: <CategoryPage />
    }
  ])

  return <RouterProvider router = {router} />;
}

export default Router;