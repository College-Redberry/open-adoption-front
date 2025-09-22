import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BYPASS_AUTH } from './context';
import { AuthRepo } from '../../domain/auth/repository';
import { AuthHttpRepo } from '../../data/repository/auth/auth-http-repo';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(BYPASS_AUTH)) {
    return next(req);
  }

  const auth = inject<AuthRepo>(AuthHttpRepo);

  const authReq = req.clone({
    setHeaders: {
      "Authorization": `Bearer ${auth.token()}`,
      "Accept": "application/json",
    }
  });

  return next(authReq);
};