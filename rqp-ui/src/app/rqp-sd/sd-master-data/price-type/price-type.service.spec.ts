import { TestBed } from '@angular/core/testing';

import { PriceTypeService } from './price-type.service';

describe('PriceTypeService', () => {
  let service: PriceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
