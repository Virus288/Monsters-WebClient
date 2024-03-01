import type { AxiosResponse } from 'axios';
import clientApi from '../tools/axios';
import type { EUserRace } from '../enums';

export const createGameProfile = async (race: EUserRace): Promise<AxiosResponse> => {
  return clientApi.post('/profile', race);
};

export const sendMessage = async (message: string, receiver: string): Promise<AxiosResponse> => {
  return clientApi.put('/message/send', { message, receiver });
};

export const getMessages = async (): Promise<AxiosResponse> => {
  return clientApi.get('message?page=1');
};
