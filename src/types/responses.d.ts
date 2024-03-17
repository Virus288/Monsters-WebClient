import type { IDefaultResponse } from './generic';
import type { ILoginBody, IUserProfile } from './account';
import type { IActionEntity, IFightEntity } from './fights';
import type { EFightStatus } from '../enums';

export type IGetLogin = {
  login: string;
  sub: string;
} & IDefaultResponse;

export type IGetProfile = { data: IUserProfile } & IDefaultResponse;

export type IGetToken = ILoginBody & IDefaultResponse;

export type IAttack = { data: { logs: IActionEntity[]; status: EFightStatus } } & IDefaultResponse;

export type IGetActiveFight = { data: IFightEntity[] } & IDefaultResponse;
