import styled from 'styled-components';
import { Container } from '../../../shared/styled';
import type * as localTypes from '../../../types';

export const SettingsContainer = styled(Container)<localTypes.IDefaultComponentProps>`
  width: 100%;
  height: 100vh;
  background: rgba(100, 100, 100, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  position: fixed;
  top: 0;
  left: auto;
  right: 0;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 7;

  @media (min-width: 768px) {
    align-items: center;
  }

  @media (max-width: 767px) {
    align-items: flex-start;
  }
`;

export const SettingsBody = styled('div')<localTypes.IDefaultComponentProps>`
  border-left: 1px solid grey;
  background: ${(props): string => props.theme.background.semiTransparent};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  transition: ${(props): string => props.theme.transition.semiSlow};

  * {
    margin: 10px auto;
  }

  @media (min-width: 768px) {
    height: 300px;
    width: 500px;
    border-radius: 20px;
  }

  @media (max-width: 767px) {
    height: 100%;
    width: 100%;
  }
`;
