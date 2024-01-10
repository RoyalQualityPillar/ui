import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaterialTypeAuditTrailComponent } from './all-material-type-audit-trail.component';

describe('AllMaterialTypeAuditTrailComponent', () => {
  let component: AllMaterialTypeAuditTrailComponent;
  let fixture: ComponentFixture<AllMaterialTypeAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMaterialTypeAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMaterialTypeAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
