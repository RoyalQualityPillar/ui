import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePriceTypeComponent } from './create-update-price-type.component';

describe('CreateUpdatePriceTypeComponent', () => {
  let component: CreateUpdatePriceTypeComponent;
  let fixture: ComponentFixture<CreateUpdatePriceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePriceTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdatePriceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
