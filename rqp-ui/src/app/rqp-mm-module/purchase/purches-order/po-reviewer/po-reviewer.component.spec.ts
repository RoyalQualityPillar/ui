import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoReviewerComponent } from './po-reviewer.component';

describe('PoReviewerComponent', () => {
  let component: PoReviewerComponent;
  let fixture: ComponentFixture<PoReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
