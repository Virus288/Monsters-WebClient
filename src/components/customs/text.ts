import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../types';

export const Orange = styled(motion.span)<localTypes.IDefaultChildren>`
  color: ${(props): string => props.theme.colors.ohOrange};
`;

export const Header = styled(motion.header)<localTypes.ITextChildren>`
  width: ${(props): number => (props.$full ? 100 : 50)}%;
  text-align: center;
  font-size: 2rem;
  font-weight: lighter;
  letter-spacing: 0.9px;
  padding: 1rem;
`;

export const PanelHeader = styled(Header)<localTypes.IHeaderProps>`
  width: ${(props): number => (props.$center ? 100 : 15)}%;
  font-size: 2.5rem;
  align-self: ${(props): string => (props.$center ? 'inherit' : 'flex-start')};
  margin: ${(props): string => (props.$center ? '0' : '0 1')}rem;
  border-bottom: 1px solid ${(props): string => props.theme.colors.default};
`;

export const OneLine = styled(motion.span)<localTypes.IHeaderProps>`
  display: block;
  font-size: 1.3em;
  font-weight: 400;
  letter-spacing: 0.9px;
`;

export const ErrorText = styled(motion.header)<localTypes.ITextChildren>`
  width: ${(props): number => (props.$full ? 100 : 50)}%;
  font-size: 1.3rem;
  text-align: center;
  color: red;
`;

export const SuccessText = styled(motion.header)<localTypes.ITextChildren>`
  width: ${(props): number => (props.$full ? 100 : 50)}%;
  font-size: 1.3rem;
  text-align: center;
  color: green;
`;
