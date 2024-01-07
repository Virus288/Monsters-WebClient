export interface IPreLoginBody {
  login: string;
}

export interface ILoginBody {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
