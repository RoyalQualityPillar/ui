import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveModuleAuditTrailComponent } from './active-module-audit-trail.component';

describe('ActiveModuleAuditTrailComponent', () => {
  let component: ActiveModuleAuditTrailComponent;
  let fixture: ComponentFixture<ActiveModuleAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveModuleAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveModuleAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
