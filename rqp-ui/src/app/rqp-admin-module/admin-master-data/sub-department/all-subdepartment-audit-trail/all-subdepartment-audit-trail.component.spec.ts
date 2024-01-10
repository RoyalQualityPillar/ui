import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubdepartmentAuditTrailComponent } from './all-subdepartment-audit-trail.component';

describe('AllSubdepartmentAuditTrailComponent', () => {
  let component: AllSubdepartmentAuditTrailComponent;
  let fixture: ComponentFixture<AllSubdepartmentAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSubdepartmentAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSubdepartmentAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
