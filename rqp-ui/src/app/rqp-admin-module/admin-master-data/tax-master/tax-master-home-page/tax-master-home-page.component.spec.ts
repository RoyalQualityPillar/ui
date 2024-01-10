import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxMasterHomePageComponent } from './tax-master-home-page.component';

describe('TaxMasterHomePageComponent', () => {
  let component: TaxMasterHomePageComponent;
  let fixture: ComponentFixture<TaxMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
