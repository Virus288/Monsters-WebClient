import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ILogProps } from '../types';
import type { IDefaultComponentProps } from '../../../types';

export const LogsContainer = styled(motion.div)<ILogProps>`
  background: #1e2128;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  color: #ffffff;
  flex-wrap: wrap;
  transition: ${(props): string => props.theme.transition.semiSlow};
  padding: 60px 5px 5px 5px;
  max-height: calc(100vh - 70px);

  &::-webkit-scrollbar {
    width: 15px;
    border-radius: 50px;
    background: ${(props): string => props.theme.background.opposite};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props): string => props.theme.colors.ohOrange};
    border-radius: 50px;

    &:hover {
      cursor: pointer;
    }
  }

  div {
    margin: 5px 2px 5px 2px;
    word-break: break-word;
  }

  @media (min-width: 768px) {
    width: ${(props): number => props.$width}px;
  }

  @media (max-width: 767px) {
    width: 98%;
  }
`;

export const LogAnimationContainer = styled(motion.div)<IDefaultComponentProps>`
  width: 100%;
  overflow: scroll;
  scroll-behavior: smooth;
`;

export const UserLog = styled(motion.div)<IDefaultComponentProps>`
  text-align: right;
`;

export const LogBottomContainer = styled(motion.div)<ILogProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    width: ${(props): number => props.$width}px;
  }

  @media (max-width: 767px) {
    width: 98%;
  }
`;

export const HintsContainer = styled(motion.div)<ILogProps>`
  height: fit-content;
  max-height: 130px;
  overflow: scroll;

  @media (min-width: 768px) {
    width: ${(props): number => props.$width}px;
  }

  @media (max-width: 767px) {
    width: 98%;
  }
`;

export const HintBody = styled(motion.div)<IDefaultComponentProps>`
  border: 2px solid ${(props): string => props.theme.colors.ohOrange};
  border-radius: 5%;
  box-shadow: 1px 1px 1px ${(props): string => props.theme.shadows.black};
  font-weight: 200;
  letter-spacing: 0.9px;
  font-size: 1.1em;
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  height: fit-content;
  width: fit-content;
  display: inline-block;

  @media (min-width: 768px) {
    &:hover {
      box-shadow: none;
      transition: ${(props): string => props.theme.transition.default};
    }
  }
`;

export const LogInput = styled(motion.input)<IDefaultComponentProps>`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1.1em;
  background: none;
  height: 50px;
  color: ${(props): string => props.theme.colors.default};
  border-bottom: 1px solid ${(props): string => props.theme.colors.default};
  transition: ${(props): string => props.theme.transition.semiSlow};
  margin: 10px 0 10px 0;
  padding: 10px;

  &::placeholder {
    color: ${(props): string => props.theme.colors.semiDefault};
    transition: ${(props): string => props.theme.transition.semiSlow};
  }

  &:focus {
    border-bottom: 1px solid ${(props): string => props.theme.colors.ohOrange};
    transition: ${(props): string => props.theme.transition.semiSlow};
    box-shadow: 1px 1px 1px ${(props): string => props.theme.colors.ohOrange};
  }
`;

export const LogButton = styled(motion.button)<IDefaultComponentProps>`
  background: ${(props): string => props.theme.background.default};
  width: 60px;
  height: 50px;
  margin: 10px 5px 10px 10px;
  color: ${(props): string => props.theme.colors.ohOrange};
  border: 2px solid ${(props): string => props.theme.colors.ohOrange};
  border-radius: 5%;
  box-shadow: 1px 1px 1px ${(props): string => props.theme.shadows.black};
  transition: ${(props): string => props.theme.transition.default};
  font-weight: 200;
  letter-spacing: 0.9px;
  font-size: 1.5em;
  cursor: pointer;
  padding: 10px;

  @media (min-width: 768px) {
    &:hover {
      box-shadow: none;
      transition: ${(props): string => props.theme.transition.default};
    }
  }
`;
