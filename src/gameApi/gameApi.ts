import type { AxiosResponse } from 'axios';
import { loggedClient } from '../tools/axios';
import type { EUserRace } from '../enums';
import type { IDefaultResponse, IGetAttack, IGetLogs, IGetMessages } from '../types';

export const sendMessage = async (message: string, receiver: string): Promise<AxiosResponse<IDefaultResponse>> => {
  const response = await loggedClient.put('/message/send', { message, receiver });

  if (response.status >= 400) {
    throw response.data.error;
  } else {
    return response;
  }
};

export const getMessages = async (): Promise<AxiosResponse<IGetMessages>> => {
  const response = await loggedClient.get('message?page=1');

  if (response.status >= 400) {
    throw response.data.error;
  } else {
    return response;
  }
};

export const getLogs = async (): Promise<AxiosResponse<IGetLogs>> => {
  const response = await loggedClient.get('logs');

  if (response.status >= 400) {
    throw response.data.error;
  } else {
    return response;
  }
};

export const initProfile = async (race: EUserRace): Promise<AxiosResponse<IDefaultResponse>> => {
  const response = await loggedClient.post('/profile', { race });

  if (response.status >= 400) {
    throw response.data.error;
  } else {
    return response;
  }
};

export const attack = async (target: string): Promise<AxiosResponse<IGetAttack>> => {
  const response = await loggedClient.post('/fights/attack', { target });

  if (response.status >= 400) {
    throw response.data.error;
  } else {
    return response;
  }
};
