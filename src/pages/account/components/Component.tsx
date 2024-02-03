import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimateEntry, Container, Header } from '../../../shared/styled';
import * as animation from '../../../style/animation';
import { useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { userName } = useMainSelector(hooks.accountState);

  useEffect(() => {
    if (!userName) navigate('/');
  }, [navigate, userName]);

  return (
    <AnimateEntry variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <Container $justify="space-around" $wrap="nowrap">
        <Header>This section is under construction. Come back later</Header>
      </Container>
    </AnimateEntry>
  );
};

export default Account;
