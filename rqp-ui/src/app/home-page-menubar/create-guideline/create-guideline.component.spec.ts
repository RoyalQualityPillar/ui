import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuidelineComponent } from './create-guideline.component';

describe('CreateGuidelineComponent', () => {
  let component: CreateGuidelineComponent;
  let fixture: ComponentFixture<CreateGuidelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGuidelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
