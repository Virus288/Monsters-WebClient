import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import AuthLayout from "./_auth/AuthLayout";
import Register from "./_auth/pages/register/Register";
import Login from "./_auth/pages/Login";
import LandingPage from "./_auth/pages/LandingPage";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import { useEffect } from "react";
import { getUserLogin, getUserProfile, userLogin } from "./clientApi/clientApi";
import Cookies from "./tools/cookies";
import { useAccountStore, useProfileStore } from "./zustand/store";

function App() {
  const setUser = useAccountStore((state) => state.setAccount);
  const setProfile = useProfileStore((state)=>state.setProfile)
  const loginUser = async (cookie: string) => {
    new Cookies().addLoginToken(cookie, Date.now() + 1000 * 60 * 24 * 30);
    const data = await getUserLogin();
    const profile = await getUserProfile(data.login)
 
    setUser({ id: data.sub, login: data.login });
    setProfile(profile)
    // await getUserProfile(data.id)
  };

  useEffect(() => {
    const accessToken = new Cookies().getToken("monsters.uid");

    if (accessToken) {
      loginUser(accessToken).catch((e) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryClient = new QueryClient();

  // #TODO - FIX ROOTLAYOUT ROUTING
  const router = createBrowserRouter([
    {
      path: "/:id",
      element: <RootLayout />,
      children: [
        {
          path: "/:id",
          element: <Home />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#010B00]">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
