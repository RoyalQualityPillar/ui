import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairQuotationHomePageComponent } from './fair-quotation-home-page.component';

describe('FairQuotationHomePageComponent', () => {
  let component: FairQuotationHomePageComponent;
  let fixture: ComponentFixture<FairQuotationHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FairQuotationHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairQuotationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
