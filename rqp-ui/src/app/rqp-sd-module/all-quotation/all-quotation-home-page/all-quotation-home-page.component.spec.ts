import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuotationHomePageComponent } from './all-quotation-home-page.component';

describe('AllQuotationHomePageComponent', () => {
  let component: AllQuotationHomePageComponent;
  let fixture: ComponentFixture<AllQuotationHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllQuotationHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllQuotationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
