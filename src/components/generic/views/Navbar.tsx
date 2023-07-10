import React from 'react';
import { NavbarBody, NavbarContainer, NavButton, NavIcons, NavLink, NavToggle } from '../themed';
import { toggleNavbar } from '../utils';
import type * as enums from '../../../enums';

const Navbar: React.FC<{
  setAppActive: React.Dispatch<React.SetStateAction<enums.EAppState>>;
  appActive: enums.EAppState;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  settings: boolean;
}> = ({ setSettings, settings, appActive, setAppActive }) => {
  return (
    <NavbarContainer id="NavbarContainer" onClick={(e): void => toggleNavbar(setAppActive, appActive, e)}>
      <NavbarBody $justify="flex-start">
        <NavButton>
          <NavLink to="/" replace>
            <h4>Home</h4>
          </NavLink>
        </NavButton>

        <NavIcons>
          <NavButton onClick={(): void => setSettings(!settings)}>
            <i className="icon-cog" />
          </NavButton>
        </NavIcons>
      </NavbarBody>
      <NavToggle id="NavToggle" onClick={(e): void => toggleNavbar(setAppActive, appActive, e)} />
    </NavbarContainer>
  );
};

export default Navbar;
