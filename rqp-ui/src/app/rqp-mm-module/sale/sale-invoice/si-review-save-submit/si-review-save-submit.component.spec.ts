import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiReviewSaveSubmitComponent } from './si-review-save-submit.component';

describe('SiReviewSaveSubmitComponent', () => {
  let component: SiReviewSaveSubmitComponent;
  let fixture: ComponentFixture<SiReviewSaveSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiReviewSaveSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiReviewSaveSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
