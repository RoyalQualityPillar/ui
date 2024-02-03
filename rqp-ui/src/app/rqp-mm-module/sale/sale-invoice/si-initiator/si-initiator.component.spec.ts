import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiInitiatorComponent } from './si-initiator.component';

describe('SiInitiatorComponent', () => {
  let component: SiInitiatorComponent;
  let fixture: ComponentFixture<SiInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
