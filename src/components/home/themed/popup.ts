import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../../types';

// eslint-disable-next-line import/prefer-default-export
export const AccountPopup = styled(motion.div)<localTypes.IDefaultChildren>`
  position: fixed;
  top: 60px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  height: 150px;
  min-width: 250px;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  background: ${(props): string => props.theme.background.semiTransparent};
  box-shadow: ${(props): string => `1px 1px 1px ${props.theme.shadows.default}`};
  color: ${(props): string => props.theme.colors.default};
  z-index: 9;
`;
