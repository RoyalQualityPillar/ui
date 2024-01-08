import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDosageFormAtComponent } from './active-dosage-form-at.component';

describe('ActiveDosageFormAtComponent', () => {
  let component: ActiveDosageFormAtComponent;
  let fixture: ComponentFixture<ActiveDosageFormAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveDosageFormAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveDosageFormAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
