import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoReviewSaveSubmitComponent } from './so-review-save-submit.component';

describe('SoReviewSaveSubmitComponent', () => {
  let component: SoReviewSaveSubmitComponent;
  let fixture: ComponentFixture<SoReviewSaveSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoReviewSaveSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoReviewSaveSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
