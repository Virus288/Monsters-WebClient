import type { EUserRace } from '../enums/commands';

export interface IPreLoginBody {
  login: string;
  sub: string;
}

export interface ILoginBody {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

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
