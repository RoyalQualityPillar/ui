import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDesigantionAuditTrailComponent } from './all-desigantion-audit-trail.component';

describe('AllDesigantionAuditTrailComponent', () => {
  let component: AllDesigantionAuditTrailComponent;
  let fixture: ComponentFixture<AllDesigantionAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDesigantionAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDesigantionAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
