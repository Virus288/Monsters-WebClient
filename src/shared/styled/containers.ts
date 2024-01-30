import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../types';

/**
 * Animated entry container
 */
export const AnimateEntry = styled(motion.div)<localTypes.IDefaultComponentProps>``;

/**
 * Basic container to cover space
 */
export const Container = styled('div')<localTypes.IContainerProps>`
  width: 100%;
  min-height: ${(props): number => props.$height ?? 100}vh;
  display: flex;
  flex-direction: ${(props): string => props.$direction ?? 'column'};
  justify-content: ${(props): string => props.$justify ?? 'center'};
  align-items: ${(props): string => props.$align ?? 'center'};
  flex-wrap: ${(props): string => props.$wrap ?? 'wrap'};
  overflow-y: ${(props): string => (props.$noScroll ? 'hidden' : 'auto')};
  overflow-x: hidden;
  background: ${(props): string => props.theme.background.semiTransparent};
  color: ${(props): string => props.theme.colors.default};
  transition: ${(props): string => props.theme.transition.semiSlow};
  padding-top: ${(props): number => (props.$spacer ? 60 : 0)}px;

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
`;

/**
 * Container used as overlay
 */
export const OverlayContainer = styled(Container)<localTypes.IDefaultComponentProps>`
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

export const OverlayContainerBody = styled('div')<localTypes.IDefaultComponentProps>`
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

/**
 * Container to limit text width
 */
export const ContainText = styled('span')<localTypes.ISpanProps>`
  @media (min-width: 768px) {
    width: ${(props): number => props.$width ?? 100}%;
  }

  @media (max-width: 767px) {
    width: ${(props): number => props.$mobileWidth ?? 100}%;
  }
`;
