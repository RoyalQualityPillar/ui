import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtInitiatorComponent } from './qt-initiator.component';

describe('QtInitiatorComponent', () => {
  let component: QtInitiatorComponent;
  let fixture: ComponentFixture<QtInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
