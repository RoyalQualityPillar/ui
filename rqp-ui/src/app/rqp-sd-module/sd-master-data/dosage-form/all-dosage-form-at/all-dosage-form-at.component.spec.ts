import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDosageFormAtComponent } from './all-dosage-form-at.component';

describe('AllDosageFormAtComponent', () => {
  let component: AllDosageFormAtComponent;
  let fixture: ComponentFixture<AllDosageFormAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDosageFormAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDosageFormAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
