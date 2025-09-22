import { Signal } from '@angular/core';
import { AsyncResult } from '../../utils/result';
import { Credentials } from './dto';

export interface AuthRepo {
    logIn(credential: Credentials): AsyncResult<string>;
    logOut(): AsyncResult<void>;
    refresh(): AsyncResult<string>;
    token: Signal<string | undefined>;
}
