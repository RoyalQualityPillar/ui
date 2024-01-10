import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSpsAuditTrailComponent } from './active-sps-audit-trail.component';

describe('ActiveSpsAuditTrailComponent', () => {
  let component: ActiveSpsAuditTrailComponent;
  let fixture: ComponentFixture<ActiveSpsAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSpsAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveSpsAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
