import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTaxMasterAuditTrailComponent } from './active-tax-master-audit-trail.component';

describe('ActiveTaxMasterAuditTrailComponent', () => {
  let component: ActiveTaxMasterAuditTrailComponent;
  let fixture: ComponentFixture<ActiveTaxMasterAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveTaxMasterAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveTaxMasterAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
