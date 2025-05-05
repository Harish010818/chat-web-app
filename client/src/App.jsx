import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import HomePage from "./components/HomePage"
 
const router = createBrowserRouter([
  {
    path:"/",
    element: <HomePage />
  },

  {
    path:"/login",
    element:<Login/>
  },

  {
    path:"/signup",
    element:<Signup/>
  }

])

function App() {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
