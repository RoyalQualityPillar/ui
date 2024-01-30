import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoInitiatorComponent } from './so-initiator.component';

describe('SoInitiatorComponent', () => {
  let component: SoInitiatorComponent;
  let fixture: ComponentFixture<SoInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
