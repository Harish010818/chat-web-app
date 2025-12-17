import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProtectRoute from "./protectRoute/ProtectRoute";
import LayoutLoader from "./components/shared/Loader";
import { useGetUser } from "./hooks/useGetUser";

function App() {
  const { loader } = useSelector((store) => store.user);
  useGetUser();
  
  const router = createBrowserRouter([
    {path: "/", element: <LandingPage />}, 
    {path: "/login", element: <LoginPage />},
    {path: "/signup", element: <SignupPage />},
    {path: "/home",element: (<ProtectRoute><HomePage /></ProtectRoute>)},
    {
     path: "*",
      element: (
        <div className="flex items-center justify-center min-h-screen text-3xl">
          404 Page Not Found...
        </div>
      ),
    },
  ]);

  return loader ? (
    <LayoutLoader />
  ) : (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;