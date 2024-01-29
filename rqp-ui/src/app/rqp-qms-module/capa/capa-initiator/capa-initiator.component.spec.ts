import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaInitiatorComponent } from './capa-initiator.component';

describe('CapaInitiatorComponent', () => {
  let component: CapaInitiatorComponent;
  let fixture: ComponentFixture<CapaInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapaInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapaInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
