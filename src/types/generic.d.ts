import type { IUserProfile } from './account';

export type IDefaultResponse = {
  error?: Error;
  state?: Partial<IUserProfile>;
};

export type IServerError = Error;
