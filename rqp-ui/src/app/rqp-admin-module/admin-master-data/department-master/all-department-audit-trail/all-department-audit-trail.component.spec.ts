import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDepartmentAuditTrailComponent } from './all-department-audit-trail.component';

describe('AllDepartmentAuditTrailComponent', () => {
  let component: AllDepartmentAuditTrailComponent;
  let fixture: ComponentFixture<AllDepartmentAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDepartmentAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDepartmentAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
