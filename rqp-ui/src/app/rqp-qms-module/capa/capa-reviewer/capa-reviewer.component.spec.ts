import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaReviewerComponent } from './capa-reviewer.component';

describe('CapaReviewerComponent', () => {
  let component: CapaReviewerComponent;
  let fixture: ComponentFixture<CapaReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapaReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapaReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
