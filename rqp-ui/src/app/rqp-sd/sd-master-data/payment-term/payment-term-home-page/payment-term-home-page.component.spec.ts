import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTermHomePageComponent } from './payment-term-home-page.component';

describe('PaymentTermHomePageComponent', () => {
  let component: PaymentTermHomePageComponent;
  let fixture: ComponentFixture<PaymentTermHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTermHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTermHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
