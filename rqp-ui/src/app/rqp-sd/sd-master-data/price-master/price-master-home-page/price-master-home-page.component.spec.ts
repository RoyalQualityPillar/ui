import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceMasterHomePageComponent } from './price-master-home-page.component';

describe('PriceMasterHomePageComponent', () => {
  let component: PriceMasterHomePageComponent;
  let fixture: ComponentFixture<PriceMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
