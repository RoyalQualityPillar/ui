import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevReviewerComponent } from './dev-reviewer.component';

describe('DevReviewerComponent', () => {
  let component: DevReviewerComponent;
  let fixture: ComponentFixture<DevReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
