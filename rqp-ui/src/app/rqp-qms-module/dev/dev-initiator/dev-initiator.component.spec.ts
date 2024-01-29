import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevInitiatorComponent } from './dev-initiator.component';

describe('DevInitiatorComponent', () => {
  let component: DevInitiatorComponent;
  let fixture: ComponentFixture<DevInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
