import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NciReviewerComponent } from './nci-reviewer.component';

describe('NciReviewerComponent', () => {
  let component: NciReviewerComponent;
  let fixture: ComponentFixture<NciReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NciReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NciReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
