import type { RootMainState } from '../store/types';
import type * as types from './types';

// eslint-disable-next-line import/prefer-default-export
export const communicatorState = (state: RootMainState): types.IAccountState => state.account;
