import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitTypeCreateUpdateComponent } from './business-unit-type-create-update.component';

describe('BusinessUnitTypeCreateUpdateComponent', () => {
  let component: BusinessUnitTypeCreateUpdateComponent;
  let fixture: ComponentFixture<BusinessUnitTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessUnitTypeCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessUnitTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
