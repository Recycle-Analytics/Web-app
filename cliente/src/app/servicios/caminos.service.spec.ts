import { TestBed } from '@angular/core/testing';

import { CaminosService } from './caminos.service';

describe('CaminosService', () => {
  let service: CaminosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaminosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
