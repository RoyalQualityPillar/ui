import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveOrgMasterAuditTrailComponent } from './active-org-master-audit-trail.component';

describe('ActiveOrgMasterAuditTrailComponent', () => {
  let component: ActiveOrgMasterAuditTrailComponent;
  let fixture: ComponentFixture<ActiveOrgMasterAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveOrgMasterAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveOrgMasterAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
