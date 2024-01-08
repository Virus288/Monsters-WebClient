import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBody } from '../themed/navbar';
import { Header } from '../../customs';
import { RenderAccountPopup } from './Renderer';

const Navbar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <NavBody>
      <Header $width="fit-content" onClick={(): void => navigate('/')}>
        Monsters
      </Header>
      <i className="icon-user" onClick={(): void => setShow(!show)} />
      <RenderAccountPopup show={show} />
    </NavBody>
  );
};

export default Navbar;
