import React from 'react';
import { Container, ContainerBody } from '../../customs';
import * as animation from '../../../animation';

const Profile: React.FC = () => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>Profile</ContainerBody>
    </Container>
  );
};

export default Profile;
