import type { IDefaultResponse } from './generic';
import type { ILoginBody, IUserProfile } from './account';
import type { IFightResponse } from './terminal';

export type IGetLogin = {
  login: string;
  sub: string;
} & IDefaultResponse;

export type IGetProfile = { data: IUserProfile } & IDefaultResponse;

export type IGetToken = ILoginBody & IDefaultResponse;

export type IGetAttack = { data: IFightResponse[] } & IDefaultResponse;
