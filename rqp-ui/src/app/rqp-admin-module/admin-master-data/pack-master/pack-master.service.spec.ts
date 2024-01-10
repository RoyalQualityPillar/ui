import { TestBed } from '@angular/core/testing';

import { PackMasterService } from './pack-master.service';

describe('PackMasterService', () => {
  let service: PackMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
