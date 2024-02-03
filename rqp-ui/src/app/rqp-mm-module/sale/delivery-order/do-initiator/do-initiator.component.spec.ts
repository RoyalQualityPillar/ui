import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoInitiatorComponent } from './do-initiator.component';

describe('DoInitiatorComponent', () => {
  let component: DoInitiatorComponent;
  let fixture: ComponentFixture<DoInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
