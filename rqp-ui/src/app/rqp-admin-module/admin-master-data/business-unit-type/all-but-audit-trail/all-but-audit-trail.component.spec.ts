import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllButAuditTrailComponent } from './all-but-audit-trail.component';

describe('AllButAuditTrailComponent', () => {
  let component: AllButAuditTrailComponent;
  let fixture: ComponentFixture<AllButAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllButAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllButAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
