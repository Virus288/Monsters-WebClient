import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ContainerBody } from '../../customs';
import type { IDefaultChildren } from '../../../types';

export const SettingsContainer = styled(motion.div)<IDefaultChildren>`
  width: fit-content;
  height: 100vh;
  position: fixed;
  top: 0;
  left: auto;
  right: 0;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 9;
`;

export const SettingsBody = styled(ContainerBody)<IDefaultChildren>`
  height: 100%;
  width: 500px;
  border-left: 1px solid grey;
  background: ${(props): string => props.theme.background.semiTransparent};
`;
