import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubMaterialAuditTrailComponent } from './all-sub-material-audit-trail.component';

describe('AllSubMaterialAuditTrailComponent', () => {
  let component: AllSubMaterialAuditTrailComponent;
  let fixture: ComponentFixture<AllSubMaterialAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSubMaterialAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSubMaterialAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
