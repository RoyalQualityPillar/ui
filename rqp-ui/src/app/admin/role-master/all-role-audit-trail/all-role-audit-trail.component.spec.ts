import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRoleAuditTrailComponent } from './all-role-audit-trail.component';

describe('AllRoleAuditTrailComponent', () => {
  let component: AllRoleAuditTrailComponent;
  let fixture: ComponentFixture<AllRoleAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRoleAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRoleAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
