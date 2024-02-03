import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiReviewerComponent } from './si-reviewer.component';

describe('SiReviewerComponent', () => {
  let component: SiReviewerComponent;
  let fixture: ComponentFixture<SiReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
