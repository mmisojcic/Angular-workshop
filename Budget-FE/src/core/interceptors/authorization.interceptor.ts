import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

import { JwtTokenService } from '../services/jwt-token.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private jwtTokenService: JwtTokenService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwtToken = this.jwtTokenService.getToken();

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return next.handle(req);
  }
}
