import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import ErrorPage from "./components/errorpage/ErrorPage.jsx"
import ProductPage from "./components/product-page/ProductPage.jsx"

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
    }
  ])

  return <RouterProvider router = {router} />;
}

export default Router;