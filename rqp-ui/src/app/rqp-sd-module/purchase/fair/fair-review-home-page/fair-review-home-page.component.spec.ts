import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairReviewHomePageComponent } from './fair-review-home-page.component';

describe('FairReviewHomePageComponent', () => {
  let component: FairReviewHomePageComponent;
  let fixture: ComponentFixture<FairReviewHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FairReviewHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairReviewHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
