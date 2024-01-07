import type * as types from './types';

export const accountState = (state: types.MainState): types.IAccountState => state.account;
export const staticState = (state: types.MainState): types.IStaticState => state.statics;

export const websocketState = (state: types.MainState): types.IWebsocketState => state.websocket;
