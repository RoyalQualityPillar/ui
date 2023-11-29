import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtReviewerHomePageComponent } from './qt-reviewer-home-page.component';

describe('QtReviewerHomePageComponent', () => {
  let component: QtReviewerHomePageComponent;
  let fixture: ComponentFixture<QtReviewerHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtReviewerHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtReviewerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
