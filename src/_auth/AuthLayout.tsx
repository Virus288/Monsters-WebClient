import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAccountStore } from '../zustand/store';

const AuthLayout: React.FC = () => {
  const { isLoggedIn } = useAccountStore.getState();

  return (
    <div className=" h-full w-full flex overflow-hidden ">
      {!isLoggedIn ? (
        <section className="flex-1 h-full overflow-y-scroll custom-scrollbar">
          <Outlet />
        </section>
      ) : (
        <Navigate to="/terminal" />
      )}
      <img
        src="/public/images/monsters-bg_3.jpg"
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </div>
  );
};

export default AuthLayout;
