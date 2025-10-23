import { TestBed } from '@angular/core/testing';

import { RequestHttpRepo } from './request-http-repo';

describe('RequestHttpRepo', () => {
  let service: RequestHttpRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestHttpRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
