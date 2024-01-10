import { TestBed } from '@angular/core/testing';

import { NumberingSystemService } from './numbering-system.service';

describe('NumberingSystemService', () => {
  let service: NumberingSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberingSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
