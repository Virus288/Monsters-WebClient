import { Link } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import React from 'react';
import { Button } from './ui/button';
import Portal from './Portal';
import { logout } from '../controllers/logout';


const Navbar: React.FC = () => {
  const user = false;

  return (
    <nav className=" flex flex-col items-center h-[55px]">
      <div className="w-[95%] flex justify-between h-full items-center">
        <span className="text-slate-300 font-bold text-base lg:text-xl">Monsters</span>
        {user && (
          <div className="flex items-center gap-6 ">
            <Link to="/login">
              <span className="text-slate-300 ">
                <Button className="text-base" variant="ghost">
                  Login
                </Button>
              </span>
            </Link>
            <Link to="/register">
              <span className="text-slate-300 ">
                <Button className="text-base" variant="ghost">
                  Join
                </Button>
              </span>
            </Link>
          </div>
        )}

        {!user && (
          <div>
            <Link to="/register">
              <span className="text-slate-300 ">
                <Button className="text-base" variant="ghost" onClick={logout}>
                  <IoLogOutOutline className="mr-1" size={22} />
                  Logout
                </Button>

              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
