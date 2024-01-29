import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NciInitiatorComponent } from './nci-initiator.component';

describe('NciInitiatorComponent', () => {
  let component: NciInitiatorComponent;
  let fixture: ComponentFixture<NciInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NciInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NciInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
