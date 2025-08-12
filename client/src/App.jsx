import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import io from "socket.io-client"
import { setSocket } from "./useRedux/socketSlice"
import { setAuthUser, setLoader, setOnlineUsers } from "./useRedux/userSlice"
import axios from "axios"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import ProtectRoute from "./protectRoute/ProtectRoute"
import LayoutLoader from "./components/shared/Loader"


function App() {

  const { authUser, loader } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);

  const dispatch = useDispatch();



  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoader(true));
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`,
          {
            withCredentials: true
          }
        );

        dispatch(setAuthUser(res.data.myProfile));
      } catch (err) {

        dispatch(setAuthUser(null)); // Ensure authUser is null on error
        console.error("Failed to fetch user:", err);

      } finally {
        dispatch(setLoader(false));
      }
    };

    fetchUser();
  }, [dispatch]);


  useEffect(() => {

    if (authUser) {
      const socketio = io(`${import.meta.env.VITE_API_URL}`, { query: { userId: authUser._id } })

      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers) => {


        dispatch(setOnlineUsers(onlineUsers))

      });

      return () => {
        socketio.off('getOnlineUsers'); // Prevent multiple listeners
        socketio.close();
      };
    }

    else {

      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }

  }, [authUser])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },

    {
      path: "/login",
      element: <LoginPage />
    },

    {
      path: "/signup",
      element: <SignupPage />
    },

    {
      path: "/home",
      element: (
        <ProtectRoute>
          <HomePage />
        </ProtectRoute>
      )
    },

    {
      path: "*",
      element: <div className="flex items-center justify-center min-h-screen text-3xl">404 Page Not Found...</div>
    }
  ])

  return loader ? (
    <LayoutLoader />
  ) : (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;