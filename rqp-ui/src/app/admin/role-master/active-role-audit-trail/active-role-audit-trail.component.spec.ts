import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRoleAuditTrailComponent } from './active-role-audit-trail.component';

describe('ActiveRoleAuditTrailComponent', () => {
  let component: ActiveRoleAuditTrailComponent;
  let fixture: ComponentFixture<ActiveRoleAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveRoleAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveRoleAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
