import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as types from '../../../types';

export const Container = styled(motion.div)<types.IDefaultChildren>`
  border: 1px solid grey;

  @media (max-width: 767px) {
    width: 100%;
    height: 75px;
  }
`;

export const ContainerBody = styled(motion.div)<types.IContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

export const MessageCounter = styled(motion.div)<types.IContainerProps>`
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background: ${(props): string => props.theme.colors.ohOrange};
  border-radius: 50%;
  cursor: default;
  pointer-events: none;
`;
