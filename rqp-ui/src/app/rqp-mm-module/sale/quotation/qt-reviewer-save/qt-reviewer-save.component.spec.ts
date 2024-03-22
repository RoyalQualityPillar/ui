import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtReviewerSaveComponent } from './qt-reviewer-save.component';

describe('QtReviewerSaveComponent', () => {
  let component: QtReviewerSaveComponent;
  let fixture: ComponentFixture<QtReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
