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
import { QueryClient, QueryClientProvider } from "react-query";
import { useTerminal } from "./hooks/useTerminal";
import { useEffect, useMemo } from "react";

function App() {
  const user = "Adam";

  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
    invalidCommand,
  } = useTerminal();

  useEffect(() => {
    resetTerminal();

    start();
    loadStatus();
  }, []);

  const loadStatus = async () => {
    await pushToHistory(
      <>
        <div className="text-normal">
          Welcome
          <span className="text-orange-400 ml-1 mr-1">
            <strong>{user}</strong>
          </span>
          Nice to see You !
        </div>
        <br />
        <div>You can write: 'help' , to check list of avalible commands.</div>
      </>
    );
  };

  const start = async () => {
    await pushToHistory(
      <>
        <div>
          <strong>Starting</strong> the server...{" "}
          <span style={{ color: "green" }}>Done</span>
        </div>
      </>
    );
  };

  const help = async () => {
    await pushToHistory(
      <div className="flex flex-col">
        <p className="font-semibold">Here are all the commands you can use:</p>
        <span>- game init</span>
        <span>- alert</span>
        <span>- races</span>
        <span>- profile</span>
        <span>- messages</span>
        <span>- messages</span>
        <span>- sendMsg</span>
        <span>- clear</span>
        <span>- exit</span>
      </div>
    );
  };

  const alert = async () => {
    alert("Hello!");
    await pushToHistory(
      <>
        <div>
          <strong>Alert</strong>
          <span style={{ color: "orange", marginLeft: 10 }}>
            <strong>Shown in the browser</strong>
          </span>
        </div>
      </>
    );
  };

  const commands = useMemo(
    () => ({
      help: help,
      clear: resetTerminal,
      start: start,
      alert: alert,
    }),
    [pushToHistory]
  );

  const queryClient = new QueryClient();

  // #TODO - FIX ROOTLAYOUT ROUTING
  const router = createBrowserRouter([
    {
      path: "/:id",
      element: <RootLayout />,
      children: [
        {
          path: "/:id",
          element: (
            <Home
              commands={commands}
              history={history}
              ref={setTerminalRef}
              promptLabel={<div className="text-green-400">You{" >>"}</div>}
            />
          ),
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
