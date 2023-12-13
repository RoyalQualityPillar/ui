import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtUpdateComponent } from './qt-update.component';

describe('QtUpdateComponent', () => {
  let component: QtUpdateComponent;
  let fixture: ComponentFixture<QtUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
