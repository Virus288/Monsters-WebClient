import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../types';

// eslint-disable-next-line import/prefer-default-export
export const Header = styled(motion.header)<localTypes.ITextProps>`
  width: ${(props): string | number =>
    props.$width ? (typeof props.$width === 'string' ? props.$width : `${props.$width}%`) : '50%'};
  text-align: center;
  font-size: 2rem;
  font-weight: lighter;
  letter-spacing: 0.9px;
  padding: 1rem;
`;
