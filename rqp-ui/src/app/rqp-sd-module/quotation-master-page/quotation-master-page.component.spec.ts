import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationMasterPageComponent } from './quotation-master-page.component';

describe('QuotationMasterPageComponent', () => {
  let component: QuotationMasterPageComponent;
  let fixture: ComponentFixture<QuotationMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationMasterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
