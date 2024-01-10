import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPackMasterAuditTrailComponent } from './all-pack-master-audit-trail.component';

describe('AllPackMasterAuditTrailComponent', () => {
  let component: AllPackMasterAuditTrailComponent;
  let fixture: ComponentFixture<AllPackMasterAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPackMasterAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPackMasterAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
