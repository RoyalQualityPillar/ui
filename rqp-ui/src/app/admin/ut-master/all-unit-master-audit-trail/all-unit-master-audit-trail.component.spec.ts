import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUnitMasterAuditTrailComponent } from './all-unit-master-audit-trail.component';

describe('AllUnitMasterAuditTrailComponent', () => {
  let component: AllUnitMasterAuditTrailComponent;
  let fixture: ComponentFixture<AllUnitMasterAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUnitMasterAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUnitMasterAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
