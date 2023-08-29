import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      // TO-DO: add error page
    }
  ])

  return <RouterProvider router = {router} />;
}

export default Router;