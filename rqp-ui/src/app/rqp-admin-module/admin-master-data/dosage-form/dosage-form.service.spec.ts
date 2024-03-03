import { TestBed } from '@angular/core/testing';

import { DosageFormService } from './dosage-form.service';

describe('DosageFormService', () => {
  let service: DosageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DosageFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
