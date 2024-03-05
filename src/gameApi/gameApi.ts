import type { AxiosResponse } from 'axios';
import clientApi from '../tools/axios';
import type { EUserRace } from '../enums';
import { IFightResponse } from '../types';
import Cookies from '../tools/cookies';

export const createGameProfile = async (race: EUserRace): Promise<AxiosResponse> => {
  return clientApi.post('/profile', race);
};

export const sendMessage = async (message: string, receiver: string): Promise<AxiosResponse> => {
  return clientApi.put('/message/send', { message, receiver });
};

export const getMessages = async (): Promise<AxiosResponse> => {
  return clientApi.get('message?page=1');
};




export const initProfile = async (initFormData: string): Promise<void> => {
  const accessToken = new Cookies().getToken('monsters.uid');
  const response = await clientApi.post('/profile', { race: initFormData }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  return response.data;
}


export const attack = async (attackTarget: string): Promise<IFightResponse[]> => {
  const response = await clientApi.get('/fights/attack', attackTarget);
  return (response.data as { data: IFightResponse[] }).data;
};