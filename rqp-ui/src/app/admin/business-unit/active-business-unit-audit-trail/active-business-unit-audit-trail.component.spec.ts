import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBusinessUnitAuditTrailComponent } from './active-business-unit-audit-trail.component';

describe('ActiveBusinessUnitAuditTrailComponent', () => {
  let component: ActiveBusinessUnitAuditTrailComponent;
  let fixture: ComponentFixture<ActiveBusinessUnitAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveBusinessUnitAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveBusinessUnitAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
