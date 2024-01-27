import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftQuotationHomePageComponent } from './draft-quotation-home-page.component';

describe('DraftQuotationHomePageComponent', () => {
  let component: DraftQuotationHomePageComponent;
  let fixture: ComponentFixture<DraftQuotationHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftQuotationHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftQuotationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
