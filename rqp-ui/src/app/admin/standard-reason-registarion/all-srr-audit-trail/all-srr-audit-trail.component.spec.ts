import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSrrAuditTrailComponent } from './all-srr-audit-trail.component';

describe('AllSrrAuditTrailComponent', () => {
  let component: AllSrrAuditTrailComponent;
  let fixture: ComponentFixture<AllSrrAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSrrAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSrrAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
