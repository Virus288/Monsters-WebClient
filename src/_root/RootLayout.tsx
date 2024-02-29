import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAccountStore } from '../zustand/store';

const RootLayout: React.FC = () => {
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);

  if (isLoggedIn === 'undefined') {
    return (
      <div className="h-screen w-full ">
        <Navbar />
        <section className="border-2"> Loading...</section>
      </div>
    );
  }

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
