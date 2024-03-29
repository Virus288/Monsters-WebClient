import type { ECharacterState, EUserRace } from '../enums';

export interface IUserProfile {
  _id: string;
  user: string;
  race: EUserRace;
  friends: string[];
  lvl: number;
  exp: number[];
  initialized: boolean;
  inventory: string;
  party: string;
  state: ECharacterState;
}

export type IUser = {
  login: string;
  id: string;
};

export interface ILoginBody {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

type IFightFormData = {
  team: string[];
};
