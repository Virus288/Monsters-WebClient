import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


const AuthLayout = () => {
  return (
    <div className=" h-screen w-full " >
<Navbar/>
<section>
    <Outlet/>
</section>

    </div>
  )
}

export default AuthLayout