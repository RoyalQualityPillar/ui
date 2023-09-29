import { TestBed } from '@angular/core/testing';

import { BusinessUnitTypeService } from './business-unit-type.service';

describe('BusinessUnitTypeService', () => {
  let service: BusinessUnitTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessUnitTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
