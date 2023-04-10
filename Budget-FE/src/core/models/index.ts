export interface ICredentials {
  username: string;
  password: string;
}

export interface ILoginPayload {
  token: string;
}

export interface IJwtTokenPayload {
  Username: string;
  Role: string;
  jti: string;
  exp: number;
  iss: string;
  aud: string;
}
