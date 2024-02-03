import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoInitiatorComponent } from './po-initiator.component';

describe('PoInitiatorComponent', () => {
  let component: PoInitiatorComponent;
  let fixture: ComponentFixture<PoInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
