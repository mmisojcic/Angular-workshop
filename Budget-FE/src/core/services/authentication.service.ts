import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'environments/environment';
import { ICredentials, ILoginPayload } from '../models';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  endpoint: string = 'api/Authenticate';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtTokenService: JwtTokenService
  ) {}

  register(credentials: ICredentials) {
    this.http
      .post(`${environment.serverUrl}/${this.endpoint}/register`, credentials)
      .subscribe({
        next: () => {
          this.router.navigate([`login`]);
        },
      });
  }

  login(credentials: ICredentials) {
    this.http
      .post<ILoginPayload>(
        `${environment.serverUrl}/${this.endpoint}/login`,
        credentials
      )
      .subscribe({
        next: (res) => {
          this.jwtTokenService.setToken(res.token);
          this.router.navigate([`home`]);
        },
        error: (error) => console.log(error),
      });
  }

  logout() {
    this.jwtTokenService.removeToken();
    this.router.navigate(['login']);
  }
}
