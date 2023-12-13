import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStockLedgerComponent } from './create-update-stock-ledger.component';

describe('CreateUpdateStockLedgerComponent', () => {
  let component: CreateUpdateStockLedgerComponent;
  let fixture: ComponentFixture<CreateUpdateStockLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateStockLedgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateStockLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
