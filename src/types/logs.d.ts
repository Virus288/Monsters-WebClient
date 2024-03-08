import type { IDefaultResponse } from './generic';

export interface ILog {
  _id: string;
  message: string;
  date: string;
}

export type IGetLogs = { data: ILog[] } & IDefaultResponse;
