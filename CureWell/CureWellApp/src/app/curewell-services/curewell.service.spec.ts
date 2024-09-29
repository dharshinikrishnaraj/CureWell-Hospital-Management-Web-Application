import { TestBed } from '@angular/core/testing';

import { CurewellService } from './curewell.service';

describe('CurewellService', () => {
  let service: CurewellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurewellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
