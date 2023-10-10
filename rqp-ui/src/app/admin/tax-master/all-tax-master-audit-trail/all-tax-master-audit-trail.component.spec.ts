import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaxMasterAuditTrailComponent } from './all-tax-master-audit-trail.component';

describe('AllTaxMasterAuditTrailComponent', () => {
  let component: AllTaxMasterAuditTrailComponent;
  let fixture: ComponentFixture<AllTaxMasterAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTaxMasterAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTaxMasterAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
