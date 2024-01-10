import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMaterialTypeAuditTrailComponent } from './active-material-type-audit-trail.component';

describe('ActiveMaterialTypeAuditTrailComponent', () => {
  let component: ActiveMaterialTypeAuditTrailComponent;
  let fixture: ComponentFixture<ActiveMaterialTypeAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveMaterialTypeAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveMaterialTypeAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
