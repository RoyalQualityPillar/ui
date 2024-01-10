import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAuditTrailComponent } from './active-audit-trail.component';

describe('ActiveAuditTrailComponent', () => {
  let component: ActiveAuditTrailComponent;
  let fixture: ComponentFixture<ActiveAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
