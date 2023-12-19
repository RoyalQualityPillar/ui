import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePaymentTermComponent } from './create-update-payment-term.component';

describe('CreateUpdatePaymentTermComponent', () => {
  let component: CreateUpdatePaymentTermComponent;
  let fixture: ComponentFixture<CreateUpdatePaymentTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePaymentTermComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdatePaymentTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
