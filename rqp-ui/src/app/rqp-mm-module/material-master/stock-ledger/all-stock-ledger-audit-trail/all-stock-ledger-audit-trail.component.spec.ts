import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStockLedgerAuditTrailComponent } from './all-stock-ledger-audit-trail.component';

describe('AllStockLedgerAuditTrailComponent', () => {
  let component: AllStockLedgerAuditTrailComponent;
  let fixture: ComponentFixture<AllStockLedgerAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStockLedgerAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllStockLedgerAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
