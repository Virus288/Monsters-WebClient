import styled from 'styled-components';
import type * as localTypes from '../../../types';
import { OverlayContainerBody } from '../../../shared/styled';

// eslint-disable-next-line import/prefer-default-export
export const HelpContainer = styled(OverlayContainerBody)<localTypes.IDefaultComponentProps>`
  height: auto;
  max-height: 90%;
  padding: 5px;
  overflow: auto;
  flex-wrap: nowrap;
`;
