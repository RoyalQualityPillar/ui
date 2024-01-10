import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSrrAuditTrailComponent } from './active-srr-audit-trail.component';

describe('ActiveSrrAuditTrailComponent', () => {
  let component: ActiveSrrAuditTrailComponent;
  let fixture: ComponentFixture<ActiveSrrAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSrrAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveSrrAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
