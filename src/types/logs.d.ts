import type { IDefaultResponse } from './generic';

export interface ILog {
  _id: string;
  message: string;
  target: string;
  date: string;
}

export type IGetLogs = { data: ILog[] } & IDefaultResponse;

export type IAddLogs = { data: { _id: string } } & IDefaultResponse;
