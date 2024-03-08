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

const App: React.FC = () => {
  const [isRootRdy, setIsRootRdy] = useState(false);
  const [isAuthRdy, setIsAuthRdy] = useState(false);

  useEffect(() => {
    const accessToken = new Cookies().getToken('monsters.uid');

    if (accessToken) {
      loginUser(accessToken).catch((err) => console.log('Got err with prelogin', err));
    }

    setTimeout(() => {
      setIsRootRdy(true);
      setIsAuthRdy(true);
    }, 500);
  }, []);

  return (
    <main className="bg-[#010B00] h-screen">
      <Router>
        <Routes>
          <Route element={isAuthRdy ? <AuthLayout /> : <AuthLoader />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={isRootRdy ? <RootLayout /> : <RootLoader />}>
            <Route path="/*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
