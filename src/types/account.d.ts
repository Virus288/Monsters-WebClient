export interface IPreLoginBody {
  login: string;
  sub: string;
}

export interface ILoginBody {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
