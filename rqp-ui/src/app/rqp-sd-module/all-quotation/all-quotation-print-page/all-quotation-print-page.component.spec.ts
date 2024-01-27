import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuotationPrintPageComponent } from './all-quotation-print-page.component';

describe('AllQuotationPrintPageComponent', () => {
  let component: AllQuotationPrintPageComponent;
  let fixture: ComponentFixture<AllQuotationPrintPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllQuotationPrintPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllQuotationPrintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
