import { TestBed } from '@angular/core/testing';
import { AuthHttpClient } from './service';

describe('AuthHttpClient', () => {
  let service: AuthHttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
