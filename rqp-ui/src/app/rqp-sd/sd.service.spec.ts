import { TestBed } from '@angular/core/testing';

import { SdService } from './sd.service';

describe('SdService', () => {
  let service: SdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
