import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAccountStore } from '../zustand/store';

const AuthLayout: React.FC = () => {
  const { isLoggedIn } = useAccountStore.getState();

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
