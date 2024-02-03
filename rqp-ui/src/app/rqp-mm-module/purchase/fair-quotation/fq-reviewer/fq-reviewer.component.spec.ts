import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqReviewerComponent } from './fq-reviewer.component';

describe('FqReviewerComponent', () => {
  let component: FqReviewerComponent;
  let fixture: ComponentFixture<FqReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FqReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
