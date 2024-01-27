import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DqReviewHomePageComponent } from './dq-review-home-page.component';

describe('DqReviewHomePageComponent', () => {
  let component: DqReviewHomePageComponent;
  let fixture: ComponentFixture<DqReviewHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DqReviewHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DqReviewHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
