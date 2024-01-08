import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosageFormHomePageComponent } from './dosage-form-home-page.component';

describe('DosageFormHomePageComponent', () => {
  let component: DosageFormHomePageComponent;
  let fixture: ComponentFixture<DosageFormHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosageFormHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DosageFormHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
