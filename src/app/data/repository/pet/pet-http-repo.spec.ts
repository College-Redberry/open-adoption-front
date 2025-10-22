import { TestBed } from '@angular/core/testing';

import { PetHttpRepo } from './pet-http-repo';

describe('PetsHttpRepo', () => {
  let service: PetHttpRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetHttpRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
