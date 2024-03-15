import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react';
import RootLayout from './_root/RootLayout';
import Home from './_root/pages/Home';
import AuthLayout from './_auth/AuthLayout';
import Register from './_auth/pages/register/Register';
import LandingPage from './_auth/pages/LandingPage';
import Cookies from './tools/cookies';
import { loginUser } from './controllers';
import RootLoader from './components/RootLoader';
import AuthLoader from './components/AuthLoader';
import Login from './_auth/pages/Login';
import { useAccountStore, useProfileStore } from './zustand/store';
import { ETokenNames } from './enums';
import type { IUser, IUserProfile } from './types';

const App: React.FC = () => {
  const [isRootRdy, setIsRootRdy] = useState(false);
  const [isAuthRdy, setIsAuthRdy] = useState(false);
  const profile = useProfileStore((state) => state.profile);
  const account = useAccountStore((state) => state.account);

  useEffect(() => {
    const accessToken = new Cookies().getToken(ETokenNames.Access);

    if (accessToken) {
      loginUser().catch((err) => console.log('Got err with preLogin', err));
    }

    setTimeout(() => {
      setIsRootRdy(true);
      setIsAuthRdy(true);
    }, 800);
  }, []);

  return (
    <main className="bg-[#010B00] h-screen dark:bg-white ">
      <Router>
        <Routes>
          <Route element={isAuthRdy ? <AuthLayout /> : <AuthLoader />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={isRootRdy ? <RootLayout /> : <RootLoader />}>
            <Route path="/*" element={<Home account={account as IUser} profile={profile as IUserProfile} />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
