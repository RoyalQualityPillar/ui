import { TestBed } from '@angular/core/testing';

import { SaleProductMasterService } from './sale-product-master.service';

describe('SaleProductMasterService', () => {
  let service: SaleProductMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleProductMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
