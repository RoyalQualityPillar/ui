import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitTypeHomePageComponent } from './business-unit-type-home-page.component';

describe('BusinessUnitTypeHomePageComponent', () => {
  let component: BusinessUnitTypeHomePageComponent;
  let fixture: ComponentFixture<BusinessUnitTypeHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessUnitTypeHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessUnitTypeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
