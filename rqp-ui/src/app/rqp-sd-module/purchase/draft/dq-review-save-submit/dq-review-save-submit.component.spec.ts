import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DqReviewSaveSubmitComponent } from './dq-review-save-submit.component';

describe('DqReviewSaveSubmitComponent', () => {
  let component: DqReviewSaveSubmitComponent;
  let fixture: ComponentFixture<DqReviewSaveSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DqReviewSaveSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DqReviewSaveSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
