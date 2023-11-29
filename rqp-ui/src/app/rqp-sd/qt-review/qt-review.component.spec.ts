import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtReviewComponent } from './qt-review.component';

describe('QtReviewComponent', () => {
  let component: QtReviewComponent;
  let fixture: ComponentFixture<QtReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
