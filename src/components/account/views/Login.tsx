import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimateEntry, Container, Header } from '../../customs';
import * as animation from '../../../animation';
import { logIn } from '../handler';
import { useMainDispatch } from '../../../redux/hooks';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useMainDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      logIn(code, dispatch)
        .then((): void => {
          navigate('/');
          return undefined;
        })
        .catch((err) => {
          // #TODO Add proper information about unsuccessful login
          console.log('Login error');
          console.log(err);
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
    <AnimateEntry variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <Container $justify="space-around" $wrap="nowrap">
        <Header>Login</Header>
      </Container>
    </AnimateEntry>
  );
};

export default Login;
