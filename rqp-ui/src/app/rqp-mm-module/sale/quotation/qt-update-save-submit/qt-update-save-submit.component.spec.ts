import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtUpdateSaveSubmitComponent } from './qt-update-save-submit.component';

describe('QtReviewSaveSubmitComponent', () => {
  let component: QtUpdateSaveSubmitComponent;
  let fixture: ComponentFixture<QtUpdateSaveSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtUpdateSaveSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtUpdateSaveSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
