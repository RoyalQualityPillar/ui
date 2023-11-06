import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationHomePageComponent } from './quotation-home-page.component';

describe('QuotationHomePageComponent', () => {
  let component: QuotationHomePageComponent;
  let fixture: ComponentFixture<QuotationHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
