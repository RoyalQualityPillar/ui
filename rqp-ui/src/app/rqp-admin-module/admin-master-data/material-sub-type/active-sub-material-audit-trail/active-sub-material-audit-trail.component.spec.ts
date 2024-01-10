import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSubMaterialAuditTrailComponent } from './active-sub-material-audit-trail.component';

describe('ActiveSubMaterialAuditTrailComponent', () => {
  let component: ActiveSubMaterialAuditTrailComponent;
  let fixture: ComponentFixture<ActiveSubMaterialAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSubMaterialAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveSubMaterialAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
