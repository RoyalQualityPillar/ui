import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDesigantionAuditTrailComponent } from './active-desigantion-audit-trail.component';

describe('ActiveDesigantionAuditTrailComponent', () => {
  let component: ActiveDesigantionAuditTrailComponent;
  let fixture: ComponentFixture<ActiveDesigantionAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveDesigantionAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveDesigantionAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
