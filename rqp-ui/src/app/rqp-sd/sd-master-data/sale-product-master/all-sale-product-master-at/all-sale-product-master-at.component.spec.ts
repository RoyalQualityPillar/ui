import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSaleProductMasterAtComponent } from './all-sale-product-master-at.component';

describe('AllSaleProductMasterAtComponent', () => {
  let component: AllSaleProductMasterAtComponent;
  let fixture: ComponentFixture<AllSaleProductMasterAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSaleProductMasterAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSaleProductMasterAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
