import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStockLedgerAuditTrailComponent } from './active-stock-ledger-audit-trail.component';

describe('ActiveStockLedgerAuditTrailComponent', () => {
  let component: ActiveStockLedgerAuditTrailComponent;
  let fixture: ComponentFixture<ActiveStockLedgerAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveStockLedgerAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveStockLedgerAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
