import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBody } from '../themed/navbar';
import { Header } from '../../customs';
import { RenderAccountPopup } from './Renderer';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import { toggleSettings } from '../utils';

const Navbar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const { userName } = useMainSelector(hooks.accountState);
  const { settings } = useMainSelector(hooks.staticState);
  const navigate = useNavigate();
  const dispatch = useMainDispatch();

  return (
    <NavBody>
      <Header onClick={(): void => navigate('/')}>Monsters</Header>
      <span>
        {userName ? <i className="icon-cog" onClick={(): void => toggleSettings(dispatch, settings)} /> : null}
        <i className="icon-user" onClick={(): void => setShow(!show)} />
      </span>
      <RenderAccountPopup show={show} />
    </NavBody>
  );
};

export default Navbar;
