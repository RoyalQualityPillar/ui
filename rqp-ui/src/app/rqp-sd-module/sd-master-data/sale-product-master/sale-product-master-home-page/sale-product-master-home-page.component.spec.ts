import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleProductMasterHomePageComponent } from './sale-product-master-home-page.component';

describe('SaleProductMasterHomePageComponent', () => {
  let component: SaleProductMasterHomePageComponent;
  let fixture: ComponentFixture<SaleProductMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleProductMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleProductMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
