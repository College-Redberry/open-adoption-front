import { inject, Injectable } from '@angular/core';
import { ListResponse } from '../../../utils/http_response';
import { AsyncResult } from '../../../utils/result';
import { RequestProps } from '../../../domain/request/entity';
import { RequestHttpClient } from '../../service/request/request-http-client';
import { Request } from '../../../domain/request/entity';

@Injectable({
  providedIn: 'root'
})
export class RequestHttpRepo {
  private requestHttpClient = inject(RequestHttpClient);

  async create(request: RequestProps): AsyncResult<string> {
    return this.requestHttpClient.create(request);
  }

  async approve(id: string): AsyncResult<void> {
    return this.requestHttpClient.approve(id);
  }

  async list(): AsyncResult<ListResponse<Request>> {
    return this.requestHttpClient.list();
  }

  async getByID(id: string): AsyncResult<Request> {
    return this.requestHttpClient.getByID(id);
  }
}
