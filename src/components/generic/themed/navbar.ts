import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ContainerBody, OverlayContainer } from '../../customs';
import type { IDefaultChildren } from '../../../types';

export const NavbarContainer = styled(OverlayContainer)<IDefaultChildren>`
  width: fit-content;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const NavbarBody = styled(ContainerBody)<IDefaultChildren>`
  height: 100%;
  width: 200px;
  border-right: 1px solid grey;
`;

export const NavIcons = styled(motion.div)<IDefaultChildren>`
  position: fixed;
  bottom: 0;
  left: 75px;
  z-index: 9;
`;

export const NavButton = styled(motion.button)<IDefaultChildren>`
  height: 50px;
  background: none;
  font-size: 1.5rem;
  margin: 4px;
  border: none;
  cursor: pointer;
  transition: ${(props): string => props.theme.transition.default};

  i {
    font-size: 2.3rem;
    color: ${(props): string => props.theme.colors.ohOrange};
    border-radius: 50%;
    background-size: 100% 100%;
  }
`;
