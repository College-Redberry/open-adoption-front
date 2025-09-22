import { TestBed } from '@angular/core/testing';

import { ThemeRepo } from './theme-repo';

describe('ThemeRepo', () => {
  let service: ThemeRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
