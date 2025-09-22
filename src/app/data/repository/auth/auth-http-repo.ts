import { inject, Injectable, signal } from '@angular/core';
import { AuthRepo } from '../../../domain/auth/repository';
import { Credentials } from '../../../domain/auth/dto';
import { AuthHttpClient } from '../../service/auth/service';

@Injectable({
  providedIn: "root"
})
export class AuthHttpRepo implements AuthRepo {
  private authHttpClient = inject(AuthHttpClient);

  readonly token = signal<string | undefined>(undefined);

  async logIn(credential: Credentials) {
    const result = await this.authHttpClient.LogIn(credential);
    if (result.isSuccess()) {
      this.token.set(result.value)
    }

    return result;
  }

  async logOut() {
    const result = await this.authHttpClient.logOut();
    if (result.isSuccess()) {
      this.token.set(undefined);
    } 

    return result;
  }

  async refresh() {
    const result = await this.authHttpClient.refresh();
    if (result.isSuccess()) {
      this.token.set(result.value)
    } 

    return result;
  }
}
