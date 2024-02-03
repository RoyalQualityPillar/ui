import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtHomeComponent } from './qt-home.component';

describe('QtHomeComponent', () => {
  let component: QtHomeComponent;
  let fixture: ComponentFixture<QtHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
