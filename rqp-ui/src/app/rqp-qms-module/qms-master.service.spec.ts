import { TestBed } from '@angular/core/testing';

import { QmsMasterService } from './qms-master.service';

describe('QmsMasterService', () => {
  let service: QmsMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QmsMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
