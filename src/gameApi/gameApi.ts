import type { AxiosResponse } from 'axios';
import clientApi from '../tools/axios';
import type { EUserRace } from '../enums/races';

export const createGameProfile = async (race: EUserRace): Promise<AxiosResponse> => {
  const response = await clientApi.post('/profile', race);
  return response;
};

export const sendMessage = async (message: string, receiver: string): Promise<AxiosResponse> => {
  const body = { message, receiver };
  const response = await clientApi.put('/message/send', body);
  return response;
};

export const getMessages = async (): Promise<AxiosResponse> => {
  const response = await clientApi.get('message?page=1');
  return response;
};
