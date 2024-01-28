import type * as types from './types';

export const accountState = (state: types.MainState): types.IAccountState => state.account;
export const staticState = (state: types.MainState): types.IStaticState => state.statics;
export const logsState = (state: types.MainState): types.ILogsState => state.logs;

export const profileState = (state: types.MainState): types.IProfileState => state.profile;

export const messagesState = (state: types.MainState): types.IMessagesState => state.messages;
