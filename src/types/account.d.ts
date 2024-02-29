import type { EUserRace } from '../enums';

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
}

export type IUser = {
  login: string;
  id: string;
};
