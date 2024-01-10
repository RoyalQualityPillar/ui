import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxMasterCreateUpdateComponent } from './tax-master-create-update.component';

describe('TaxMasterCreateUpdateComponent', () => {
  let component: TaxMasterCreateUpdateComponent;
  let fixture: ComponentFixture<TaxMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxMasterCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
