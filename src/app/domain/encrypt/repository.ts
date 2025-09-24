import { AsyncResult } from "../../utils/result";

export interface EncryptRepo {
    encrypt(plaintext: string): AsyncResult<string>;
}