import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtUpdateDetailsComponent } from './qt-update-details.component';

describe('QtUpdateDetailsComponent', () => {
  let component: QtUpdateDetailsComponent;
  let fixture: ComponentFixture<QtUpdateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtUpdateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
