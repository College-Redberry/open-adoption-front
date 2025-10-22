import { ListResponse, Pagination } from "../../utils/http_response";
import { AsyncResult } from "../../utils/result";
import { Pet, PetProps } from "./entity"

export interface PetRepo {
	create(pet: Pet): AsyncResult<string>;
	update(id: string, pet: PetProps): AsyncResult<void>;
	adoptById(id: string): AsyncResult<void>;
	getByID(id: string): AsyncResult<Pet>;
	list(search: string, pagination: Pagination): AsyncResult<ListResponse<Pet>>;
	listImagesById(id: string): AsyncResult<string[]>;
	saveImagesById(id: string, images: string[]): AsyncResult<void>;
}