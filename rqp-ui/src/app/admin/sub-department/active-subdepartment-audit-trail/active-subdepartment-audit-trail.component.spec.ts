import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSubdepartmentAuditTrailComponent } from './active-subdepartment-audit-trail.component';

describe('ActiveSubdepartmentAuditTrailComponent', () => {
  let component: ActiveSubdepartmentAuditTrailComponent;
  let fixture: ComponentFixture<ActiveSubdepartmentAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSubdepartmentAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveSubdepartmentAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
