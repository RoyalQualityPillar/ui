import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllModuleAuditTrailComponent } from './all-module-audit-trail.component';

describe('AllModuleAuditTrailComponent', () => {
  let component: AllModuleAuditTrailComponent;
  let fixture: ComponentFixture<AllModuleAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllModuleAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllModuleAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
