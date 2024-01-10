import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePackMasterAuditTrailComponent } from './active-pack-master-audit-trail.component';

describe('ActivePackMasterAuditTrailComponent', () => {
  let component: ActivePackMasterAuditTrailComponent;
  let fixture: ComponentFixture<ActivePackMasterAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePackMasterAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePackMasterAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
