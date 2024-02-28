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
      <img
        src="/public/images/monsters-bg_3.jpg"
        alt=""
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </div>
  );
};

export default AuthLayout;
