import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { JwtTokenService } from '../services/jwt-token.service';

export const authGuard = () => {
  const router = inject(Router);
  const jwtTokenService = inject(JwtTokenService);
  return jwtTokenService.getToken() ? true : router.navigate(['login']);
};
