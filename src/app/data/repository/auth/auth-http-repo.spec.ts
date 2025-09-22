import { TestBed } from '@angular/core/testing';

import { AuthHttpRepo } from './auth-http-repo';

describe('AuthHttpRepo', () => {
  let service: AuthHttpRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHttpRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
