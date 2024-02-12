import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


const AuthLayout = () => {
  return (
    <div className=" h-screen w-full flex " >

<section className="flex-1">
    <Outlet/>
</section>
<img src="/public/images/monsters-bg_3.jpg" alt=""
 className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
/>

    </div>
  )
}

export default AuthLayout