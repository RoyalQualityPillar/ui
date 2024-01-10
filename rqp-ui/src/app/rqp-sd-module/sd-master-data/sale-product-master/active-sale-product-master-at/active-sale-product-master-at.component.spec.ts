import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSaleProductMasterAtComponent } from './active-sale-product-master-at.component';

describe('ActiveSaleProductMasterAtComponent', () => {
  let component: ActiveSaleProductMasterAtComponent;
  let fixture: ComponentFixture<ActiveSaleProductMasterAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSaleProductMasterAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveSaleProductMasterAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
