import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { BYPASS_AUTH } from './context';
import { AuthHttpRepo } from '../../data/repository/auth/auth-http-repo';
import { AuthRepo } from '../../domain/auth/repository';

export const RefreshInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.context.get(BYPASS_AUTH)) {
        return next(req);
    }

    const authRepo = inject<AuthRepo>(AuthHttpRepo);

    return next(req).pipe(
        catchError(error => {
            if (error.status === 403) {
                return from(authRepo.refresh()).pipe(
                    switchMap(() => next(req))
                );
            }
            return throwError(() => error);
        })
    );
}