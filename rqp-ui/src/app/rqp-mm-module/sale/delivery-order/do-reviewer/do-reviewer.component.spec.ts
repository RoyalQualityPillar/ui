import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoReviewerComponent } from './do-reviewer.component';

describe('DoReviewerComponent', () => {
  let component: DoReviewerComponent;
  let fixture: ComponentFixture<DoReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
