import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Failure, Success, AsyncResult } from "../../../utils/result";
import { Request, RequestProps } from "../../../domain/request/entity";
import { ListResponse } from "../../../utils/http_response";
import { BYPASS_AUTH } from "../../../infra/interceptor/context";

@Injectable({
  providedIn: "root",
})
export class RequestHttpClient {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/v1/adoption/requests`;

  async create(request: RequestProps): AsyncResult<string> {
    try {
      const options = {
        context: new HttpContext().set(BYPASS_AUTH, true),
      };
      const req$ = this.http.post<{ id: string }>(this.baseUrl, request, options);
      const response = await lastValueFrom(req$);
      return Success(response.id);
    } catch (e) {
      return Failure(e);
    }
  }

  async approve(id: string): AsyncResult<void> {
    try {
      const req$ = this.http.patch<void>(`${this.baseUrl}/${id}/approve`, {});
      await lastValueFrom(req$);
      return Success();
    } catch (e) {
      return Failure(e);
    }
  }

  async list(): AsyncResult<ListResponse<Request>> {
    try {
      const req$ = this.http.get<ListResponse<Request>>(this.baseUrl);
      const response = await lastValueFrom(req$);

      response.data = response.data.filter(x => x.id != "");
      response.count = response.data.length;

      return Success(response);
    } catch (e) {
      return Failure(e);
    }
  }

  async getByID(id: string): AsyncResult<Request> {
    try {
      const req$ = this.http.get<Request>(`${this.baseUrl}/${id}`);
      const response = await lastValueFrom(req$);
      return Success(response);
    } catch (e) {
      return Failure(e);
    }
  }
}
