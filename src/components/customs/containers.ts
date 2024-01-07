import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../types';

/**
 * Animated entry container
 */
export const AnimateEntry = styled(motion.div)<localTypes.IDefaultChildren>``;

/**
 * Container used as overlay
 */
export const OverlayContainer = styled(motion.div)<localTypes.IDefaultChildren>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 6;
`;

/**
 * Basic container to cover space
 */
export const Container = styled('div')<localTypes.IContainerProps>`
  width: 100%;
  min-height: 100vh;
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

export const Inline = styled(motion.span)<localTypes.IDefaultChildren>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  width: fit-content;

  * {
    margin: 5px;
  }
`;
