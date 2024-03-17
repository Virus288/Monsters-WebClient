import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAccountStore } from '../zustand/store';

const RootLayout: React.FC = () => {
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);

  return (
    <div className=" h-screen w-full ">
      <Navbar />
      {isLoggedIn ? (
        <section>
          <Outlet />
        </section>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default RootLayout;
