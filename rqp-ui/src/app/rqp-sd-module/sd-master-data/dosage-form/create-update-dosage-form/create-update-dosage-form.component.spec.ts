import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateDosageFormComponent } from './create-update-dosage-form.component';

describe('CreateUpdateDosageFormComponent', () => {
  let component: CreateUpdateDosageFormComponent;
  let fixture: ComponentFixture<CreateUpdateDosageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateDosageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateDosageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
