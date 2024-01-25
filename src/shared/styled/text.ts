import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../types';

export const Header = styled(motion.header)<localTypes.ITextProps>`
  text-align: center;
  font-size: 2rem;
  font-weight: lighter;
  letter-spacing: 0.9px;
  padding: 1rem;
  color: ${(props): string => props.theme.colors.default};
`;

export const GreenText = styled(motion.header)<localTypes.ITextProps>`
  text-align: center;
  font-size: 1.5rem;
  color: green;
`;

export const RedText = styled(motion.header)<localTypes.ITextProps>`
  text-align: center;
  font-size: 1.5rem;
  color: red;
`;
