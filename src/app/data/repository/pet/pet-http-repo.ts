import { inject, Injectable } from "@angular/core";
import { PetRepo } from "../../../domain/pet/repository";
import { Pet, PetProps } from "../../../domain/pet/entity";
import { AsyncResult } from "../../../utils/result";
import { PetHttpClient } from "../../service/pet/pet-http-client";
import { ListResponse, Pagination } from "../../../utils/http_response";

@Injectable({
  providedIn: "root",
})
export class PetHttpRepo implements PetRepo {
  private petHttpClient = inject(PetHttpClient);

  async create(pet: Pet): AsyncResult<string> {
    return this.petHttpClient.create(pet);
  }

  async update(id: string, pet: PetProps): AsyncResult<void> {
    return this.petHttpClient.update(id, pet);
  }

  async adoptById(id: string): AsyncResult<void> {
    return this.petHttpClient.adoptById(id);
  }

  async getByID(id: string): AsyncResult<Pet> {
    return this.petHttpClient.getById(id);
  }

  async list(search: string, pagination: Pagination): AsyncResult<ListResponse<Pet>> {
    return this.petHttpClient.list(search, pagination);
  }

  async listImagesById(id: string): AsyncResult<string[]> {
    return this.petHttpClient.listImagesById(id);
  }

  async saveImagesById(id: string, images: File[]): AsyncResult<void> {
    return this.petHttpClient.saveImagesById(id, images);
  }
}
