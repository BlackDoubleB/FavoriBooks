import { TestBed } from '@angular/core/testing';

import { DataAccesService } from './auth.service';

describe('DataAccesService', () => {
  let service: DataAccesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAccesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
