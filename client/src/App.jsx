import { lazy, Suspense } from "react"; 
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectRoute from "./protectRoute/ProtectRoute";
import LayoutLoader from "./components/shared/Loader";
import { useGetUser } from "./hooks/useGetUser";


const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

function App() {
  const { loader } = useSelector((store) => store.user);
  useGetUser();
  
  const router = createBrowserRouter([
    {
      path: "/", 
      element: (
        <Suspense fallback={<LayoutLoader />}>
          <LandingPage />
        </Suspense>
      )
    }, 
    {
      path: "/login", 
      element: (
        <Suspense fallback={<LayoutLoader />}>
          <LoginPage />
        </Suspense>
      )
    },
    {
      path: "/signup", 
      element: (
        <Suspense fallback={<LayoutLoader />}>
          <SignupPage />
        </Suspense>
      )
    },
    {
      path: "/home",
      element: (
        <ProtectRoute>
          <Suspense fallback={<LayoutLoader />}>
            <HomePage />
          </Suspense>
        </ProtectRoute>
      )
    },
    {
      path: "*",
      element: (
        <div className="flex items-center justify-center min-h-screen text-3xl">
          404 Page Not Found...
        </div>
      ),
    },
  ]);

  // Yeh wala loader initial user fetch ke liye hai
  if (loader) return <LayoutLoader />;

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;