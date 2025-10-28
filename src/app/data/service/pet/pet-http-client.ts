import { Failure, Success, AsyncResult } from "../../../utils/result";
import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpContext, HttpParams } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Pet, PetProps } from "../../../domain/pet/entity";
import { BYPASS_AUTH } from "../../../infra/interceptor/context";
import { ListResponse, Pagination } from "../../../utils/http_response";

@Injectable({
  providedIn: "root",
})
export class PetHttpClient {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/v1/pets`;

  async create(pet: Pet): AsyncResult<string> {
    try {
      const request$ = this.http.post<{ id: string }>(this.baseUrl, pet);
      const response = await lastValueFrom(request$);
      return Success(response.id);
    } catch (e) {
      return Failure(e);
    }
  }

  async update(id: string, pet: PetProps): AsyncResult<void> {
    try {
      const request$ = this.http.put<void>(`${this.baseUrl}/${id}`, pet);
      await lastValueFrom(request$);
      return Success();
    } catch (e) {
      return Failure(e);
    }
  }

  async adoptById(id: string): AsyncResult<void> {
    try {
      const options = {
        context: new HttpContext().set(BYPASS_AUTH, true),
      }

      const request$ = this.http.post<void>(`${this.baseUrl}/${id}/adopt`, options);
      await lastValueFrom(request$);
      return Success();
    } catch (e) {
      return Failure(e);
    }
  }

  async getById(id: string): AsyncResult<Pet> {
    try {
      const options = {
        context: new HttpContext().set(BYPASS_AUTH, true),
      }

      const request$ = this.http.get<Pet>(`${this.baseUrl}/${id}`, options);
      const response = await lastValueFrom(request$);
      return Success(response);
    } catch (e) {
      return Failure(e);
    }
  }

  async list(search: string, pagination: Pagination): AsyncResult<ListResponse<Pet>>  {
    try {
      let params = new HttpParams()
      .set('offset', pagination.offset);

      if (search) {
        params = params.set('search', search);
      }

      if (pagination.limit) {
        params = params.set('limit', pagination.limit)
      }

      const options = {
        context: new HttpContext().set(BYPASS_AUTH, true),
        params: params,
      }

      const request$ = this.http.get<ListResponse<Pet>>(this.baseUrl, options);
      const response = await lastValueFrom(request$);

      response.data = response.data.filter(x => x.id != "");
      response.count = response.data.length;
      return Success(response);
    } catch (e) {
      return Failure(e);
    }
  }

  async listImagesById(id: string): AsyncResult<string[]> {
    try {
      const options = {
        context: new HttpContext().set(BYPASS_AUTH, true),
      }

      const request$ = this.http.get<string[]>(`${this.baseUrl}/${id}/images`, options);
      const response = await lastValueFrom(request$);
      return Success(response);
    } catch (e) {
      return Failure(e);
    }
  }

  async saveImagesById(id: string, images: File[]): AsyncResult<void> {
    try {
      const formData = new FormData();

      images.forEach((file) => {
        formData.append('files', file);
      });

      const request$ = this.http.post<void>(`${this.baseUrl}/${id}/images`, formData);
      await lastValueFrom(request$);
      return Success();
    } catch (e) {
      return Failure(e);
    }
  }
}
