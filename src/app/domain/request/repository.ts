import { AsyncResult } from "../../utils/result";
import { ListResponse } from "../../utils/http_response";
import { Request, RequestProps } from "./entity";

export interface RequestRepo {
  create(request: RequestProps): AsyncResult<string>;
  approve(id: string): AsyncResult<void>;
  list(): AsyncResult<ListResponse<Request>>;
  getByID(id: string): AsyncResult<Request>;
}
