import { TestBed } from '@angular/core/testing';

import { RequestHttpClient } from './request-http-client';

describe('RequestHttpClient', () => {
  let service: RequestHttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
