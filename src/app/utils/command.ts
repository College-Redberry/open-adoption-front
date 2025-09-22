import { signal, computed } from '@angular/core';
import { Result, AsyncResult } from './result';

export class Command<T, E extends unknown[] = []> {
  private _running = signal(false);
  private _error = signal<Error | null>(null);
  private _completed = signal(false);

  public running = computed(() => this._running());
  public error = computed(() => this._error());
  public completed = computed(() => this._completed());

  constructor(private action: (...params: E) => Result<T> | AsyncResult<T>) {}

  async execute(...params: E): Promise<void> {
    if (this._running()) {
      return;
    }

    this._running.set(true);
    this._completed.set(false);
    this._error.set(null);

    const result = await this.action(...params);
    this._completed.set(true);
    this._running.set(false);

    if (result.isFailure()) {
      this._error.set(result.error instanceof Error ? result.error : new Error(String(result.error)));
    }
  }

  clear() {
    this._running.set(false);
    this._error.set(null);
    this._completed.set(false);
  }
}
