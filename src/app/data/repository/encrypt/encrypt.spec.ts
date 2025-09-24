import { TestBed } from '@angular/core/testing';

import { EncryptAsyncronousRepo } from './encrypt';

describe('EncryptService', () => {
  let service: EncryptAsyncronousRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptAsyncronousRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
