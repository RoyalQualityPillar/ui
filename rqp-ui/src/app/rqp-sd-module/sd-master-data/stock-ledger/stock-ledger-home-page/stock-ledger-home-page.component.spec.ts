import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLedgerHomePageComponent } from './stock-ledger-home-page.component';

describe('StockLedgerHomePageComponent', () => {
  let component: StockLedgerHomePageComponent;
  let fixture: ComponentFixture<StockLedgerHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockLedgerHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockLedgerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
