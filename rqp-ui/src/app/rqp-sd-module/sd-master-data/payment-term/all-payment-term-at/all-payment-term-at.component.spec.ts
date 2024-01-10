import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaymentTermATComponent } from './all-payment-term-at.component';

describe('AllPaymentTermATComponent', () => {
  let component: AllPaymentTermATComponent;
  let fixture: ComponentFixture<AllPaymentTermATComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPaymentTermATComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPaymentTermATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
