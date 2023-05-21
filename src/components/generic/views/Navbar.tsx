import React from 'react';
import { Link } from '../../customs';
import { NavbarBody, NavbarContainer, NavButton, NavIcons } from '../themed';

const Navbar: React.FC<{
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  settings: boolean;
}> = ({ setSettings, settings }) => {
  return (
    <NavbarContainer>
      <NavbarBody $justify="flex-start">
        <NavButton>
          <Link to="/" replace>
            <h4>Home</h4>
          </Link>
        </NavButton>

        <NavIcons>
          <NavButton onClick={(): void => setSettings(!settings)}>
            <i className="icon-cog" />
          </NavButton>
        </NavIcons>
      </NavbarBody>
    </NavbarContainer>
  );
};

export default Navbar;
