import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUnitMasterAuditTrailComponent } from './active-unit-master-audit-trail.component';

describe('ActiveUnitMasterAuditTrailComponent', () => {
  let component: ActiveUnitMasterAuditTrailComponent;
  let fixture: ComponentFixture<ActiveUnitMasterAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveUnitMasterAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveUnitMasterAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
