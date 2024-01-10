import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTypeHomePageComponent } from './price-type-home-page.component';

describe('PriceTypeHomePageComponent', () => {
  let component: PriceTypeHomePageComponent;
  let fixture: ComponentFixture<PriceTypeHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceTypeHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceTypeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
