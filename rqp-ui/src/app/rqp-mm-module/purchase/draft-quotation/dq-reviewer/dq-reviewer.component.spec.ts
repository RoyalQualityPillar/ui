import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DqReviewerComponent } from './dq-reviewer.component';

describe('DqReviewerComponent', () => {
  let component: DqReviewerComponent;
  let fixture: ComponentFixture<DqReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DqReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DqReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
