import { TestBed } from '@angular/core/testing';

import { PetHttpClient } from './pet-http-client';

describe('PetHttpClient', () => {
  let service: PetHttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
