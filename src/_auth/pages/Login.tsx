import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLoader from '../../components/AuthLoader';
import { handleLogin } from '../../controllers/login';

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line compat/compat
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) navigate('/');

    handleLogin(code as string)
      .then(() => navigate('/terminal'))
      .catch((e) => {
        console.log(e);
        navigate('/');
      });
  }, []);
  return <AuthLoader />;
};

export default Login;
