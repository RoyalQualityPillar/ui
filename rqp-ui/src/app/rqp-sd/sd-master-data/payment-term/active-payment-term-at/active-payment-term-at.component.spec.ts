import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePaymentTermATComponent } from './active-payment-term-at.component';

describe('ActivePaymentTermATComponent', () => {
  let component: ActivePaymentTermATComponent;
  let fixture: ComponentFixture<ActivePaymentTermATComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePaymentTermATComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePaymentTermATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
