import type { RootMainState } from '../store/types';
import type * as types from './types';

export const accountState = (state: RootMainState): types.IAccountState => state.account;
export const staticState = (state: RootMainState): types.IStaticState => state.statics;
