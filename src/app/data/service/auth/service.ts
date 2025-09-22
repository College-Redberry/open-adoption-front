import { Failure, Success, AsyncResult } from '../../../utils/result';
import { inject, Injectable } from '@angular/core';
import { Credentials } from '../../../domain/auth/dto';
import { HttpClient, HttpContext } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import { BYPASS_AUTH } from '../../../infra/interceptor/context';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from './dto';

@Injectable({
    providedIn: "root"
})
export class AuthHttpClient {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/v1/auth`;

    async LogIn(credentials: Credentials): AsyncResult<string> {
        try {
            const options = {
                context: new HttpContext().set(BYPASS_AUTH, true),
                withCredentials: true,
            }

            const request$ = this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials, options).pipe(
                map(value => value.token),
            );

            const response = await lastValueFrom(request$);

            return Success(response);
        } catch(e) {
            return Failure(e);
        }
    }
    
    async logOut(): AsyncResult<void> {
        try {
            const options = {
                context: new HttpContext().set(BYPASS_AUTH, true),
                withCredentials: true,
            }

            const request$ = this.http.post<LoginResponse>(`${this.baseUrl}/logout`, {}, options)
            await lastValueFrom(request$);

            return Success();
        } catch(e) {
            return Failure(e);
        }
    }

    async refresh(): AsyncResult<string> {
        try {
            const options = {
                context: new HttpContext().set(BYPASS_AUTH, true),
                withCredentials: true,
            }

            const request$ = this.http.post<LoginResponse>(`${this.baseUrl}/refresh`, {}, options).pipe(
                map(value => value.token),
            );

            const response = await lastValueFrom(request$);

            return Success(response);
        } catch(e) {
            return Failure(e);
        }
    }
}