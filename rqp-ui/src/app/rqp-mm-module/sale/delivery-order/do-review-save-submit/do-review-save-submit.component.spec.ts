import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoReviewSaveSubmitComponent } from './do-review-save-submit.component';

describe('DoReviewSaveSubmitComponent', () => {
  let component: DoReviewSaveSubmitComponent;
  let fixture: ComponentFixture<DoReviewSaveSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoReviewSaveSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoReviewSaveSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
