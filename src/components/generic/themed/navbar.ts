import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ContainerBody, Link, OverlayContainer } from '../../customs';
import type { IDefaultChildren } from '../../../types';
import * as enums from '../../../enums';

export const NavbarContainer = styled(OverlayContainer)<IDefaultChildren>`
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;

  @media (min-width: 768px) {
    width: fit-content;
  }

  @media (max-width: 767px) {
    left: ${(props): number => (props.theme.appState === enums.EAppState.Active ? 0 : -100)}%;
    width: 100%;
    background: ${(props): string =>
      props.theme.appState === enums.EAppState.Active ? 'rgba(100, 100, 100, 0.6)' : 'rgba(100, 100, 100, 0)'};
    transition: ${(props): string => props.theme.transition.semiSlow};
  }
`;

export const NavbarBody = styled(ContainerBody)<IDefaultChildren>`
  height: 100%;

  @media (min-width: 768px) {
    width: 200px;
    border-right: 1px solid grey;
  }

  @media (max-width: 767px) {
    width: 80%;
    left: ${(props): number => (props.theme.appState === enums.EAppState.Active ? 0 : -100)}%;
  }
`;

export const NavIcons = styled(motion.div)<IDefaultChildren>`
  position: fixed;
  bottom: 0;
  z-index: 7;

  @media (min-width: 768px) {
    left: 75px;
  }

  @media (max-width: 767px) {
    left: ${(props): number => (props.theme.appState === enums.EAppState.Active ? 30 : -100)}%;
    transition: ${(props): string => props.theme.transition.semiSlow};
  }
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

export const NavLink = styled(Link).attrs({
  className: 'NavButton',
})<IDefaultChildren>``;

export const NavToggle = styled(motion.div)<IDefaultChildren>`
  position: fixed;
  top: 0;
  width: 75px;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  transform: rotate(90deg);
  font-size: 1.5rem;
  cursor: default;
  border: 1px solid grey;
  z-index: 7;

  @media (min-width: 768px) {
    display: none;
  }

  @media (max-width: 767px) {
    left: ${(props): number => (props.theme.appState === enums.EAppState.Active ? 100 : 0)}%;
    transition: ${(props): string => props.theme.transition.semiSlow};
  }
`;
