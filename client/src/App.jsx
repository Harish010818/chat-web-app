import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import HomePage from "./components/HomePage"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import io from "socket.io-client"
import { setSocket } from "./useRedux/socketSlice"
import { setOnlineUsers } from "./useRedux/userSlice"


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/signup",
    element: <Signup />
  }

])

function App() {

  const { authUser } = useSelector(store => store.user);
  const { socket }  = useSelector(store => store.socket);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io('http://localhost:3000', {
        query: {
          userId: authUser._id
        }
      })

      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers) => {
             dispatch(setOnlineUsers(onlineUsers))
      });

      return () => socketio.close();
    } 

    else {
        if (socket) {
          socket.close();
          dispatch(setSocket(null));
        }
    }

  }, [authUser])


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App