import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
 } from "react-router-dom";
import './App.css'
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import AuthLayout from "./_auth/AuthLayout";


function App() {
 
  const router = createBrowserRouter([
    {
      path:"/:id",
      element:<RootLayout/>,
      children:[
        {
          path:"/:id",
          element:<Home/>
        }
      ],

    },
    {
      path:"/",
      element:<AuthLayout/>

    }
  
  ])

  return (
<div className="bg-slate-900">
  <RouterProvider router={router}/>
</div>
  )
}

export default App
