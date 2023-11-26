import { TestBed } from '@angular/core/testing';

import { RqpInterceptor } from './rqp.interceptor';

describe('RqpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RqpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RqpInterceptor = TestBed.inject(RqpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
