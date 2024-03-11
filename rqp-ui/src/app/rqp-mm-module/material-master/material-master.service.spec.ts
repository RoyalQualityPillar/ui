import { TestBed } from '@angular/core/testing';

import { MaterialMasterService } from './material-master.service';

describe('MaterialMasterService', () => {
  let service: MaterialMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
