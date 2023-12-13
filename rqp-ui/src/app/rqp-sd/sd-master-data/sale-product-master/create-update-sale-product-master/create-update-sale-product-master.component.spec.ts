import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSaleProductMasterComponent } from './create-update-sale-product-master.component';

describe('CreateUpdateSaleProductMasterComponent', () => {
  let component: CreateUpdateSaleProductMasterComponent;
  let fixture: ComponentFixture<CreateUpdateSaleProductMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateSaleProductMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateSaleProductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
