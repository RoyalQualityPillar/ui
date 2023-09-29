import { TestBed } from '@angular/core/testing';

import { MaterialSubTypeService } from './material-sub-type.service';

describe('MaterialSubTypeService', () => {
  let service: MaterialSubTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialSubTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
