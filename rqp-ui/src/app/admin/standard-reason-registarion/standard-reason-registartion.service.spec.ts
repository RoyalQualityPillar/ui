import { TestBed } from '@angular/core/testing';

import { StandardReasonRegistartionService } from './standard-reason-registartion.service';

describe('StandardReasonRegistartionService', () => {
  let service: StandardReasonRegistartionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardReasonRegistartionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
