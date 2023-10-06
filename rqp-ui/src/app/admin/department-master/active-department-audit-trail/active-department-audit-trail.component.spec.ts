import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDepartmentAuditTrailComponent } from './active-department-audit-trail.component';

describe('ActiveDepartmentAuditTrailComponent', () => {
  let component: ActiveDepartmentAuditTrailComponent;
  let fixture: ComponentFixture<ActiveDepartmentAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveDepartmentAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveDepartmentAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
