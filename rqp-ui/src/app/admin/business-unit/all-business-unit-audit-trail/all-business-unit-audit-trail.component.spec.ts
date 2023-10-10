import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBusinessUnitAuditTrailComponent } from './all-business-unit-audit-trail.component';

describe('AllBusinessUnitAuditTrailComponent', () => {
  let component: AllBusinessUnitAuditTrailComponent;
  let fixture: ComponentFixture<AllBusinessUnitAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBusinessUnitAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBusinessUnitAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
