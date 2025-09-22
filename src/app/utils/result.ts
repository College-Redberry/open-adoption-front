export type Result<T, E = unknown> = Ok<T> | Err<E>;
export type AsyncResult<T> = Promise<Result<T>>;

export class Ok<T> {
  constructor(public readonly value: T) {}

  isSuccess(): this is Ok<T> {
    return true;
  }

  isFailure(): this is Err<any> {
    return false;
  }

  unwrap(): T {
    return this.value;
  }
}

export class Err<E> {
  constructor(public readonly error: E) {}

  isSuccess(): this is Ok<any> {
    return false;
  }

  isFailure(): this is Err<E> {
    return true;
  }

  unwrap(): never {
    throw this.error;
  }
}

export const Success = <T>(value?: T): Result<T, undefined> => new Ok(value!);
export const Failure = <E>(error: E): Result<never, E> => new Err(error);
