import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../../types';

export const ChatBody = styled(motion.div)<localTypes.IDefaultChildren>`
  width: 100%;
  max-width: 1500px;
  height: auto;
  min-height: 20vh;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: nowrap;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 5px;
  scroll-behavior: smooth;
  color: ${(props): string => props.theme.colors.default};
  transition: ${(props): string => props.theme.transition.default};

  &::-webkit-scrollbar {
    width: 15px;
    border-radius: 50px;
    background: ${(props): string => props.theme.background.default};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props): string => props.theme.background.opposite};
    border-radius: 50px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ChatMessage = styled(motion.span)<localTypes.IDefaultChildren>`
  align-self: flex-end;
  padding: 7px;
  width: 100%;
`;

export const ChatOverlayIcons = styled(motion.div)<localTypes.IDefaultChildren>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex-wrap: nowrap;
  border: 1px solid grey;

  @media (max-width: 767px) {
    width: 100%;
    height: 75px;

    input {
      &::placeholder {
        text-align: center;
      }
    }
  }
`;

export const ChatSendButton = styled(motion.div)<localTypes.IDefaultChildren>`
  width: 75px;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  transform: rotate(90deg);
  font-size: 1.5rem;
  cursor: default;
  border: 1px solid grey;
  z-index: 7;

  @media (min-width: 768px) {
    display: none;
  }
`;
