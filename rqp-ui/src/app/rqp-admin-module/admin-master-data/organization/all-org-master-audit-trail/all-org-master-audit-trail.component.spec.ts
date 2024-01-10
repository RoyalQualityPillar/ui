import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrgMasterAuditTrailComponent } from './all-org-master-audit-trail.component';

describe('AllOrgMasterAuditTrailComponent', () => {
  let component: AllOrgMasterAuditTrailComponent;
  let fixture: ComponentFixture<AllOrgMasterAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOrgMasterAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOrgMasterAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
