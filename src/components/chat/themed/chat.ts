import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../../types';
import { ContainerBody } from '../../customs';

export const InputBody = styled(motion.div)<localTypes.IDefaultChildren>`
  height: 75px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  border-top: 1px solid grey;

  button {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 10%;
  }

  textArea {
    border: none;
    background: ${(props): string => props.theme.background.semiDefault};
    border-bottom: 1px solid grey;
    font-size: 1.05em;
    width: 90%;
    transition: ${(props): string => props.theme.transition.default};

    &::placeholder {
      color: ${(props): string => props.theme.colors.default};
    }

    &:focus {
      background: ${(props): string => props.theme.background.default};
      outline: none;
    }
  }
`;

export const ChatContainer = styled(ContainerBody)<localTypes.IDefaultChildren>`
  width: 100%;
  margin: 0 auto;
  border-right: 1px solid grey;
  border-left: 1px solid grey;

  @media (min-width: 768px) {
    max-width: 1000px;
  }
`;

export const ChatMessagesContainer = styled(motion.div)<localTypes.IDefaultChildren>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: nowrap;
`;

export const ChatMessage = styled(motion.div)<localTypes.IChatMessageProps>`
  background: ${(props): string => (props.$sender ? props.theme.colors.justBlue : props.theme.colors.ohAlmostOrange)};
  width: fit-content;
  min-height: 30px;
  height: fit-content;
  align-self: ${(props): string => (props.$sender ? 'flex-end' : 'flex-start')};
`;
