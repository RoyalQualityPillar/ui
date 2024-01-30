import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoReviewerComponent } from './so-reviewer.component';

describe('SoReviewerComponent', () => {
  let component: SoReviewerComponent;
  let fixture: ComponentFixture<SoReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
