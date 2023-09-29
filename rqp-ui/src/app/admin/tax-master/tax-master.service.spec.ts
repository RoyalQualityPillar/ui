import { TestBed } from '@angular/core/testing';

import { TaxMasterService } from './tax-master.service';

describe('TaxMasterService', () => {
  let service: TaxMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
