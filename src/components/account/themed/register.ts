import styled from 'styled-components';
import type * as localTypes from '../../../types';
import { Form } from '../../customs';

// eslint-disable-next-line import/prefer-default-export
export const RegisterForm = styled(Form)<localTypes.IDefaultChildren>`
  border-bottom: 1px solid grey;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
