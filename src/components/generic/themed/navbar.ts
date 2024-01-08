import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../../types';

// eslint-disable-next-line import/prefer-default-export
export const NavBody = styled(motion.div)<localTypes.IDefaultChildren>`
  position: fixed;
  top: 0;
  right: 0;
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid grey;
  background: ${(props): string => props.theme.background.default};
  transition: ${(props): string => props.theme.transition.semiSlow};
  box-shadow: 1px 1px 1px ${(props): string => props.theme.shadows.default};
  z-index: 9;

  * {
    margin: 0 10px 0 5px;
  }

  header {
    cursor: pointer;
  }

  i {
    color: ${(props): string => props.theme.colors.ohOrange};
    font-size: 2em;
    transition: ${(props): string => props.theme.transition.semiSlow};

    &:hover {
      cursor: pointer;
      color: ${(props): string => props.theme.colors.default};
    }
  }
`;
