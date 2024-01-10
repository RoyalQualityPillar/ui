import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSpsAuditTrailComponent } from './all-sps-audit-trail.component';

describe('AllSpsAuditTrailComponent', () => {
  let component: AllSpsAuditTrailComponent;
  let fixture: ComponentFixture<AllSpsAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSpsAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSpsAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
