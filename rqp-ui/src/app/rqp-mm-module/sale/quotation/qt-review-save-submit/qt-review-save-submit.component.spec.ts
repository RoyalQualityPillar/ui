import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtReviewSaveSubmitComponent } from './qt-review-save-submit.component';

describe('QtReviewSaveSubmitComponent', () => {
  let component: QtReviewSaveSubmitComponent;
  let fixture: ComponentFixture<QtReviewSaveSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtReviewSaveSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtReviewSaveSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
