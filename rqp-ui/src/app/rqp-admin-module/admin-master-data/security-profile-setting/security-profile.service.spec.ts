import { TestBed } from '@angular/core/testing';

import { SecurityProfileService } from './security-profile.service';

describe('SecurityProfileService', () => {
  let service: SecurityProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
