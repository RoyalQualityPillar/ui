import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePriceMasterComponent } from './create-update-price-master.component';

describe('CreateUpdatePriceMasterComponent', () => {
  let component: CreateUpdatePriceMasterComponent;
  let fixture: ComponentFixture<CreateUpdatePriceMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePriceMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdatePriceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
