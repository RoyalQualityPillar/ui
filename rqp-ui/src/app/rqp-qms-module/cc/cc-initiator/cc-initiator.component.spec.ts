import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcInitiatorComponent } from './cc-initiator.component';

describe('CcInitiatorComponent', () => {
  let component: CcInitiatorComponent;
  let fixture: ComponentFixture<CcInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
