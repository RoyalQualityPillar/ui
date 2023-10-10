import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveButAuditTrailComponent } from './active-but-audit-trail.component';

describe('ActiveButAuditTrailComponent', () => {
  let component: ActiveButAuditTrailComponent;
  let fixture: ComponentFixture<ActiveButAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveButAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveButAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
