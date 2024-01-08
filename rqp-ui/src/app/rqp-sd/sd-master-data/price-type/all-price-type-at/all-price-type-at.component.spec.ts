import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPriceTypeAtComponent } from './all-price-type-at.component';

describe('AllPriceTypeAtComponent', () => {
  let component: AllPriceTypeAtComponent;
  let fixture: ComponentFixture<AllPriceTypeAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPriceTypeAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPriceTypeAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
