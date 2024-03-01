import { Outlet,Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAccountStore, useProfileStore } from '../zustand/store';


const AuthLayout:React.FC = () => {
  const {isLoggedIn} = useAccountStore.getState();
    const { account } = useAccountStore.getState();
  const { profile } = useProfileStore.getState();

  return (
    <div className=" h-screen w-full flex ">
{ !isLoggedIn?(<section className="flex-1">
        <Outlet />
      </section>):<Navigate to="/terminal"/>}
<div className='hidden xl:flex h-screen max-w-[50%] '>
     <img
        src="/public/images/monsters-bg_3.jpg"
        alt="logo-img"
        className=" object-contain bg-no-repeat object-center"
      />
</div>
    </div>
  );
};

export default AuthLayout;
