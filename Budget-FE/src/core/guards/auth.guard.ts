import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { JwtTokenService } from '../services/jwt-token.service';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard = () => {
  const router = inject(Router);
  const jwtTokenService = inject(JwtTokenService);
  const authenticationService = inject(AuthenticationService);

  if (jwtTokenService.getToken()) {
    return jwtTokenService.tokenExpired()
      ? authenticationService.logout()
      : true;
  } else {
    router.navigate(['login']);
  }
};
