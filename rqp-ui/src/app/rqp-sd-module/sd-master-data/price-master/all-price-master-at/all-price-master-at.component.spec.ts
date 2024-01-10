import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPriceMasterAtComponent } from './all-price-master-at.component';

describe('AllPriceMasterAtComponent', () => {
  let component: AllPriceMasterAtComponent;
  let fixture: ComponentFixture<AllPriceMasterAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPriceMasterAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPriceMasterAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
