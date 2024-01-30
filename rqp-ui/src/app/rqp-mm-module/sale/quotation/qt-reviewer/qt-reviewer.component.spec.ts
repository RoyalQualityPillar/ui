import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtReviewerComponent } from './qt-reviewer.component';

describe('QtReviewerComponent', () => {
  let component: QtReviewerComponent;
  let fixture: ComponentFixture<QtReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
