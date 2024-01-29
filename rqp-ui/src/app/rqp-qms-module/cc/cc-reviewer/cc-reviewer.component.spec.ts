import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcReviewerComponent } from './cc-reviewer.component';

describe('CcReviewerComponent', () => {
  let component: CcReviewerComponent;
  let fixture: ComponentFixture<CcReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
