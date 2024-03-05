import type { AxiosResponse } from 'axios';
import { loggedClient } from '../tools/axios';
import type { EUserRace } from '../enums';
import type { IDefaultResponse, IGetAttack } from '../types';

export const sendMessage = async (message: string, receiver: string): Promise<AxiosResponse<IDefaultResponse>> => {
  return loggedClient.put('/message/send', { message, receiver });
};

export const getMessages = async (): Promise<AxiosResponse> => {
  return loggedClient.get('message?page=1');
};

export const initProfile = async (race: EUserRace): Promise<AxiosResponse<IDefaultResponse>> => {
  return loggedClient.post('/profile', { race });
};

export const attack = async (target: string): Promise<AxiosResponse<IGetAttack>> => {
  return loggedClient.post('/fights/attack', { target });
};
