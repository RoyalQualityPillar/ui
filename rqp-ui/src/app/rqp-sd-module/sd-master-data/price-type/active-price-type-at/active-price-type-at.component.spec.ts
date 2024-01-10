import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePriceTypeAtComponent } from './active-price-type-at.component';

describe('ActivePriceTypeAtComponent', () => {
  let component: ActivePriceTypeAtComponent;
  let fixture: ComponentFixture<ActivePriceTypeAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePriceTypeAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePriceTypeAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
