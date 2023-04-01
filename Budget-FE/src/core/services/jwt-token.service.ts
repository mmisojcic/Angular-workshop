import { Injectable } from '@angular/core';
import JwtDecode from 'jwt-decode';

import { IJwtTokenPayload } from '../models';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenService {
  jwtTokenLocalStorageKey = 'jwt_token';

  constructor() {}

  setToken(token: string) {
    if (token) {
      localStorage.setItem(this.jwtTokenLocalStorageKey, token);
    }
  }

  removeToken() {
    localStorage.removeItem(this.jwtTokenLocalStorageKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.jwtTokenLocalStorageKey);
  }

  getDecodedToken(jwtToken?: string): IJwtTokenPayload | null {
    const tokenToUse = jwtToken ?? this.getToken();

    return jwtToken ? JwtDecode(jwtToken) : JwtDecode(tokenToUse as string);
  }

  getUsername(jwtToken?: string): string | undefined {
    return this.getDecodedToken(jwtToken)?.Username;
  }

  getExpiryTime(): number | null {
    const decodedToken = this.getDecodedToken();

    return decodedToken ? decodedToken.exp * 1000 : null;
  }

  tokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();
    return expiryTime ? new Date().getTime() > expiryTime : true;
  }
}
