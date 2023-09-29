import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitHomePageComponent } from './business-unit-home-page.component';

describe('BusinessUnitHomePageComponent', () => {
  let component: BusinessUnitHomePageComponent;
  let fixture: ComponentFixture<BusinessUnitHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessUnitHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessUnitHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
