import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
 
const router = createBrowserRouter([
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
