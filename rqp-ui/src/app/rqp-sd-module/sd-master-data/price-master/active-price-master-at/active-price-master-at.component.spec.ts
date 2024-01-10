import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePriceMasterAtComponent } from './active-price-master-at.component';

describe('ActivePriceMasterAtComponent', () => {
  let component: ActivePriceMasterAtComponent;
  let fixture: ComponentFixture<ActivePriceMasterAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePriceMasterAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePriceMasterAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
